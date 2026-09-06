/* Emit an apply_patch patch; do not modify approved page content directly. */
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const origin = 'https://hhhhhhhhhqiyuan.github.io';
const files = ['index.html', 'about.html', ...[
  'acacia', 'early-bird', 'east-oak', 'lelian', 'op-global', 'kiki', 'big-tomato', 'meat-probe'
].map(name => `projects/${name}.html`)];

(async () => {
  let patch = '*** Begin Patch\n';
  for (const file of files) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    if (html.includes('property="og:site_name"')) continue;
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)[1];
    const primary = html.match(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/)[0];
    const src = primary.match(/\bsrc="([^"]+)"/)[1];
    const alt = primary.match(/\balt="([^"]*)"/)?.[1] || title;
    const prefix = file.includes('/') ? '../' : '';
    const canonical = origin + (file === 'index.html' ? '/' : '/' + file);
    const imagePath = path.normalize(path.join(path.dirname(file), src));
    const image = origin + '/' + imagePath;
    const dimensions = await sharp(path.join(root, imagePath)).metadata();
    const replacements = [];
    const icon = html.match(/<link rel="icon" href="data:,"\s*\/?\s*>/)[0];
    replacements.push([icon, [
      `<link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg">`,
      `<link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/favicon.png">`,
      `<link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/apple-touch-icon.png">`,
      `<link rel="canonical" href="${canonical}">`,
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="Nikki Fu Portfolio">',
      '<meta property="og:locale" content="zh_CN">',
      `<meta property="og:title" content="${title}">`,
      `<meta property="og:description" content="${description}">`,
      `<meta property="og:url" content="${canonical}">`,
      `<meta property="og:image" content="${image}">`,
      '<meta property="og:image:type" content="image/webp">',
      `<meta property="og:image:width" content="${dimensions.width}">`,
      `<meta property="og:image:height" content="${dimensions.height}">`,
      `<meta property="og:image:alt" content="${alt}">`,
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${title}">`,
      `<meta name="twitter:description" content="${description}">`,
      `<meta name="twitter:image" content="${image}">`,
      `<meta name="twitter:image:alt" content="${alt}">`
    ].join('\n  ')]);
    const preload = html.match(/<link rel="preload" as="image"[^>]*>/)?.[0];
    if (preload) {
      const srcset = primary.match(/\bsrcset="([^"]+)"/)?.[1];
      const sizes = primary.match(/\bsizes="([^"]+)"/)?.[1];
      replacements.push([preload, `<link rel="preload" as="image" href="${src}"${srcset ? ` imagesrcset="${srcset}" imagesizes="${sizes}"` : ''} fetchpriority="high">`]);
    }
    patch += `*** Update File: ${path.join(root, file)}\n`;
    for (const [before, after] of replacements) {
      const start = html.lastIndexOf('\n', html.indexOf(before)) + 1;
      let end = html.indexOf('\n', html.indexOf(before) + before.length);
      if (end < 0) end = html.length;
      const line = html.slice(start, end);
      patch += '@@\n-' + line.replaceAll('\n', '\n-') + '\n+' + line.replace(before, after).replaceAll('\n', '\n+') + '\n';
    }
  }
  patch += '*** End Patch';
  process.stdout.write(patch);
})().catch(error => {console.error(error); process.exit(1);});
