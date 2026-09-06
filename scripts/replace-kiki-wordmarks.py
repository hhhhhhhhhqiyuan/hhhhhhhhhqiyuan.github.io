"""Deterministic replacement of five wordmarks using the user-approved raster.

No image generation, font substitution, or character edits. Original files remain.
"""
from pathlib import Path
import json
import cv2
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets/portfolio/kiki'
SOURCE = ASSETS / '06-lifestyle-logo-preview-v2.png'
LOGO = ASSETS / 'kiki-logo-clear-reference.png'
OUTPUT = ASSETS / '06-lifestyle-logo-exact-v9.png'
QA = ROOT / 'audits/kiki-logo-v9'
QA.mkdir(parents=True, exist_ok=True)

base = np.array(Image.open(SOURCE).convert('RGB'))
logo = np.array(Image.open(LOGO).convert('RGB')).astype(np.float32)
# Segment only the supplied dark-brown logo; discard the white surround.
dark = (logo.mean(axis=2) < 160).astype(np.uint8)
n, labels, stats, _ = cv2.connectedComponentsWithStats(dark, 8)
keep = np.zeros_like(dark)
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] > 100:
        keep[labels == i] = 1
ys, xs = np.where(keep)
x0, x1, y0, y1 = xs.min()-2, xs.max()+3, ys.min()-2, ys.max()+3
logo = logo[y0:y1, x0:x1]
support = cv2.dilate(keep, np.ones((3,3), np.uint8))[y0:y1, x0:x1]
# Solve white-matte alpha at edges, retaining the original brown interior pixels.
foreground = np.median(logo[logo.mean(axis=2) < 100], axis=0)
alpha = np.clip((255-logo.mean(axis=2))/(255-foreground.mean()), 0, 1) * support
rgb = np.clip((logo - 255*(1-alpha[...,None])) / np.maximum(alpha[...,None], .001), 0, 255)
premul = rgb * alpha[...,None]
rgba = np.dstack([rgb, alpha*255]).astype(np.uint8)
Image.fromarray(rgba).save(QA / 'source-wordmark-transparent.png')

# Each quad is TL, TR, BR, BL in the 1536x1024 original scene.
# Placements preserve the source wordmark's aspect on the object's rotated plane.
regions = [
    dict(name='tote', box=(254,768,448,881), threshold=155,
         quad=((262,792),(430,773),(439,849),(271,868))),
    dict(name='notebook', box=(829,329,934,378), threshold=150,
         quad=((834,332),(927,332),(927,374),(834,374))),
    dict(name='coffee-card', box=(769,842,862,900), threshold=190, white=True, exclude_components=[7],
         quad=((775,855),(850,846),(854,880),(779,889))),
    dict(name='croissant-card', box=(942,840,1041,900), threshold=150, exclude_components=[1],
         quad=((950,843),(1034,852),(1030,890),(946,881))),
    dict(name='standing-card', box=(1144,874,1232,925), threshold=150, exclude_components=[1],
         quad=((1157,877),(1227,890),(1221,921),(1151,908))),
]

result = base.copy()
allowed = np.zeros(base.shape[:2], np.uint8)
mask_all = np.zeros_like(allowed)
for spec in regions:
    ax, ay, bx, by = spec['box']
    roi = base[ay:by, ax:bx]
    if spec.get('white'):
        selected = (roi.min(axis=2) > spec['threshold']).astype(np.uint8)*255
    else:
        selected = (roi.mean(axis=2) < spec['threshold']).astype(np.uint8)*255
    # Exclude the nearby plate, shoe and card edge, not part of the old lettering.
    _, components = cv2.connectedComponents(selected, 8)
    for component in spec.get('exclude_components', []):
        selected[components == component] = 0
    selected = cv2.dilate(selected, np.ones((3,3),np.uint8))
    mask = np.zeros_like(allowed)
    mask[ay:by,ax:bx] = selected
    # Only replace original ink pixels and their anti-aliased boundary.
    healed = cv2.inpaint(result, mask, 5, cv2.INPAINT_TELEA)
    result[mask > 0] = healed[mask > 0]
    mask_all = np.maximum(mask_all, mask)
    allowed = np.maximum(allowed, mask)
    h, w = alpha.shape
    quad = np.float32(spec['quad'])
    left, top = np.floor(quad.min(axis=0)-3).astype(int)
    right, bottom = np.ceil(quad.max(axis=0)+4).astype(int)
    target_size = (right-left, bottom-top)
    supersample = 4
    matrix = cv2.getPerspectiveTransform(np.float32(((0,0),(w-1,0),(w-1,h-1),(0,h-1))), (quad-[left,top]).astype(np.float32)*supersample)
    large_size = tuple(v*supersample for v in target_size)
    a_small = cv2.resize(cv2.warpPerspective(alpha, matrix, large_size, flags=cv2.INTER_LINEAR), target_size, interpolation=cv2.INTER_AREA)
    a = np.zeros(base.shape[:2],np.float32)
    a[top:bottom,left:right] = a_small
    # Preserve the existing reversed, cream printing on the dark coffee card.
    ink = alpha[...,None] * np.array([247,241,227]) if spec.get('white') else premul
    p_small = cv2.resize(cv2.warpPerspective(ink, matrix, large_size, flags=cv2.INTER_LINEAR), target_size, interpolation=cv2.INTER_AREA)
    p = np.zeros(base.shape,np.float32)
    p[top:bottom,left:right] = p_small
    a = np.clip(a,0,1)
    p = np.minimum(np.maximum(p,0),a[...,None]*255)
    composed = np.clip(p + result.astype(np.float32)*(1-a[...,None]),0,255).round().astype(np.uint8)
    result[a > 0] = composed[a > 0]
    allowed[a > 0] = 255

changed = np.any(result != base, axis=2)
assert not np.any(changed & (allowed == 0)), 'Unexpected changes outside logo masks'
Image.fromarray(result).save(OUTPUT)
Image.fromarray(mask_all).save(QA / 'removed-ink-mask.png')
Image.fromarray(allowed).save(QA / 'allowed-edit-mask.png')
# A magnified before/after contact sheet for visual inspection of every placement.
sheet = Image.new('RGB', (1000, len(regions)*210), '#eee9df')
draw = ImageDraw.Draw(sheet)
for i, spec in enumerate(regions):
    ax,ay,bx,by = spec['box']
    crop_box=(ax-12,ay-12,bx+12,by+12)
    for col, arr in enumerate((base,result)):
        crop=Image.fromarray(arr).crop(crop_box)
        crop.thumbnail((450,165),Image.Resampling.LANCZOS)
        scale=min(450/crop.width,165/crop.height)
        crop=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.NEAREST)
        sheet.paste(crop,(col*500+20,i*210+32))
        draw.text((col*500+20,i*210+10),spec['name']+(' / BEFORE' if col==0 else ' / AFTER'),fill='#322013')
sheet.save(QA / 'five-wordmarks-before-after.png')
report=dict(source=str(SOURCE),logo=str(LOGO),output=str(OUTPUT),
            modified_pixels=int(changed.sum()),outside_logo_regions_modified=0,
            placements=regions,method='Original raster alpha + perspective composite; no generative redraw. Original brown logo; existing cream reverse retained on coffee card.')
(QA / 'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2))
