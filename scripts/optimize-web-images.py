"""Create WebP delivery assets while preserving all source image files.

Mechanical reference updates cover HTML, CSS and local JavaScript. Original-image
links remain intact. Run from the repository root with the bundled Python runtime.
"""
import base64
import hashlib
import io
import json
import os
import re
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import unquote, urlsplit

from PIL import Image, ImageCms, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/webp'
REPORT = ROOT / 'tmp/webp-optimization'
OUT.mkdir(parents=True, exist_ok=True)
REPORT.mkdir(parents=True, exist_ok=True)
files = [ROOT / p for p in subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode().split('\0') if p and Path(p).suffix.lower() in {'.html', '.css', '.js'}]
originals = {p: p.read_text() for p in files}
sources = {}
refs = {}
attr = re.compile(r'(?P<key>\b(?:src|poster))\s*=\s*(?P<q>[\"\'])(?P<url>.*?)(?P=q)', re.S)
css_url = re.compile(r'url\(\s*([\"\']?)(.*?)\1\s*\)', re.S)
js_path = re.compile(r'([\"\'`])([^\"\'`\s<>]+\.(?:png|jpe?g|webp)(?:\?[^\"\'`\s<>]*)?)\1', re.I)

def resolve(url, page):
    if url.startswith('data:image/'):
        try:
            header, body = url.split(',', 1)
            if ';base64' not in header or any(x in header for x in ['svg', 'gif']): return None
            data = base64.b64decode(body)
            if not data: return None
            key = 'embedded-' + hashlib.sha256(data).hexdigest()[:20]
            sources.setdefault(key, {'data': data, 'label': f'embedded image in {page.relative_to(ROOT)}'})
            return key
        except Exception: return None
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or '${' in url: return None
    raw = unquote(parsed.path)
    if Path(raw).suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}: return None
    p = (ROOT / raw.lstrip('/')) if raw.startswith('/') else (page.parent / raw).resolve()
    if not p.is_relative_to(ROOT) or not p.is_file(): return None
    if p.is_relative_to(OUT): return None
    key = str(p.relative_to(ROOT))
    sources.setdefault(key, {'path': p, 'label': key})
    return key

for page, text in originals.items():
    urls = [m['url'] for m in attr.finditer(text)] + [m[2] for m in css_url.finditer(text)]
    if page.suffix == '.js': urls += [m[2] for m in js_path.finditer(text)]
    for url in urls:
        key = resolve(url, page)
        if key: refs[(page, url)] = key

def convert(item):
    key, source = item
    data = source['data'] if 'data' in source else source['path'].read_bytes()
    try:
        image = Image.open(io.BytesIO(data))
    except Exception:
        return key, {'skipped': 'invalid source image', 'source': source['label']}
    if getattr(image, 'n_frames', 1) != 1: return key, {'skipped': 'animated'}
    original_size = image.size
    image = ImageOps.exif_transpose(image)
    if image.info.get('icc_profile'):
        try:
            image = ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(io.BytesIO(image.info['icc_profile'])), ImageCms.createProfile('sRGB'), outputMode='RGBA' if 'A' in image.getbands() else 'RGB')
        except Exception: pass
    image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
    image.thumbnail((2560, 16000), Image.Resampling.LANCZOS)
    digest = hashlib.sha256(data).hexdigest()[:16]
    stem = re.sub('[^a-zA-Z0-9_-]', '-', Path(source['label']).stem)[:45] or 'image'
    output = OUT / f'{stem}-{digest}.webp'
    image.save(output, 'WEBP', quality=92, method=6)
    # Keep already-efficient WebP pixels rather than introducing needless loss.
    if source.get('path') and source['path'].suffix.lower() == '.webp' and image.size == original_size and output.stat().st_size >= len(data):
        output.write_bytes(data)
    variants = []
    for width in [640, 1280]:
        if image.width > width * 1.15:
            small = image.copy()
            small.thumbnail((width, 16000), Image.Resampling.LANCZOS)
            variant = output.with_name(output.stem + f'-{width}w.webp')
            small.save(variant, 'WEBP', quality=90, method=5)
            variants.append((variant, small.width))
    variants.append((output, image.width))
    return key, {'source': source['label'], 'before': len(data), 'after': output.stat().st_size, 'output': output, 'width': image.width, 'height': image.height, 'original_width': original_size[0], 'original_height': original_size[1], 'variants': variants}

results = {}
with ThreadPoolExecutor(max_workers=4) as pool:
    for index, (key, result) in enumerate(pool.map(convert, sources.items()), 1):
        results[key] = result
        if index % 25 == 0: print(f'Converted {index}/{len(sources)}', flush=True)

def result_for(url, page):
    item = results.get(refs.get((page, url)))
    return item if item and 'output' in item else None

def relative(p, page): return os.path.relpath(p, page.parent).replace(os.sep, '/')

def update_tag(match, page):
    tag = match[0]
    source_match = re.search(r'\bsrc\s*=\s*([\"\'])(.*?)\1', tag, re.S)
    item = result_for(source_match[2], page) if source_match else None
    def change(m):
        result = result_for(m['url'], page)
        return f'{m["key"]}={m["q"]}{relative(result["output"], page)}{m["q"]}' if result else m[0]
    tag = attr.sub(change, tag)
    if tag.lower().startswith('<img') and item:
        # Prefer responsive variants only when no author-defined set is present.
        if not re.search(r'\bsrcset\s*=\s*[\"\'][^\"\']+', tag):
            tag = re.sub(r'\s+srcset\s*=\s*([\"\'])\1', '', tag)
            if len(item['variants']) > 1:
                values = ', '.join(f'{relative(p,page)} {w}w' for p,w in item['variants'])
                tag = tag[:-1] + f' srcset="{values}"' + (' sizes="(max-width: 640px) 100vw, (max-width: 1100px) 100vw, 1280px"' if 'sizes=' not in tag else '') + '>'
        if 'decoding=' not in tag: tag = tag[:-1] + ' decoding="async">'
    return tag

changed = []
for page, text in originals.items():
    new = re.sub(r'<(?:img|video|source)\b[^>]*>', lambda m: update_tag(m,page), text, flags=re.I|re.S)
    def change_css(m):
        result = result_for(m[2], page)
        return f'url({m[1]}{relative(result["output"],page)}{m[1]})' if result else m[0]
    new = css_url.sub(change_css, new)
    if page.suffix == '.js':
        def change_js(m):
            result = result_for(m[2], page)
            return m[1]+relative(result['output'],page)+m[1] if result else m[0]
        new = js_path.sub(change_js,new)
    if new != text:
        page.write_text(new)
        changed.append(str(page.relative_to(ROOT)))

manifest = {k: {a: (str(b.relative_to(ROOT)) if isinstance(b,Path) else b) for a,b in v.items() if a != 'variants'} for k,v in results.items()}
(REPORT/'manifest.json').write_text(json.dumps({'changed_files':changed, 'images':manifest},ensure_ascii=False,indent=2))
good = [r for r in results.values() if 'output' in r]
print(json.dumps({'converted':len(good),'changed_files':len(changed),'before_mb':sum(r['before'] for r in good)/1048576,'after_mb':sum(r['after'] for r in good)/1048576},indent=2),flush=True)
