/* Isolated headless regression check; never attaches to the user's browser. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const out = path.resolve('tmp/webp-optimization/qa');
fs.mkdirSync(out, {recursive:true});
const pages = [
 ['首页','index.html'],['关于我','about.html'],['ACACIA','projects/acacia.html'],
 ['EARLY BIRD','projects/early-bird.html'],['EAST OAK','projects/east-oak.html'],
 ['LELIAN','projects/lelian.html'],['BIG TOMATO','projects/big-tomato.html'],
 ['KIKI','projects/kiki.html'],['OP GLOBAL','projects/op-global.html'],['MEAT PROBE','projects/meat-probe.html']
];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/nikki/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
 const results=[], copy=[];
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce'});
  await context.route('**/*', route=>{
    const url=route.request().url();
    if(url.startsWith('http')&&!url.startsWith('http://127.0.0.1:4174')&&!url.startsWith('http://localhost:4174'))return route.abort();
    return route.continue();
  });
  for(const [label,url] of pages){
   const page=await context.newPage();const errors=[],failures=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400&&r.url().includes(':4174'))failures.push([r.status(),r.url()]);});
   await page.goto('http://127.0.0.1:4174/'+url,{waitUntil:'load',timeout:60000});
   await page.evaluate(async()=>{await document.fonts.ready;for(const im of document.images){if(im.loading==='lazy')im.loading='eager';}await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));});
   const id=path.basename(url,'.html')+'-'+viewport.width;
   await page.screenshot({path:path.join(out,id+'-top.png')});
   const checks=await page.evaluate(()=>{
    const vw=innerWidth;const overflow=[...document.querySelectorAll('body *')].filter(e=>{
      const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(!r.width||s.position==='absolute'||s.position==='fixed')return false;
      if(r.right<=vw+2&&r.left>=-2)return false;
      for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){if(['auto','scroll','hidden','clip'].includes(getComputedStyle(a).overflowX))return false;}
      return true;
    }).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,60)}));
    const broken=[...document.images].filter(im=>im.getBoundingClientRect().width>0&&(!im.complete||!im.naturalWidth)).map(im=>im.src);
    const distorted=[...document.images].filter(im=>{const r=im.getBoundingClientRect();return r.width>0&&im.naturalWidth&&getComputedStyle(im).objectFit==='fill'&&Math.abs((r.width/r.height)/(im.naturalWidth/im.naturalHeight)-1)>.035;}).map(im=>({src:im.src,cls:im.className}));
    const deadAnchors=[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(id=>id&&!document.getElementById(id));
    return {width:vw,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,overflow,broken,distorted,deadAnchors};
   });
   for(const [suffix,fraction] of [['middle',.5],['bottom',1]]){
     await page.evaluate(f=>scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*f,behavior:'instant'}),fraction);
     await page.screenshot({path:path.join(out,id+'-'+suffix+'.png')});
   }
   if(viewport.width===1440){
    const blocks=await page.evaluate(()=>{
      const main=document.querySelector('main')||document.body;
      const rows=[];const walk=e=>{
        if(e.nodeType===3){const text=e.textContent.replace(/\s+/g,' ').trim();if(text)rows.push({type:'p',text});return;}
        if(e.nodeType!==1||['SCRIPT','STYLE','NOSCRIPT','IFRAME','VIDEO','SVG','IMG','NAV'].includes(e.tagName)||e.hidden)return;
        const style=getComputedStyle(e);if(style.display==='none'||style.visibility==='hidden')return;
        if(e.classList.contains('exploration-canvas-heading'))return;
        if(/^(H[1-6]|P|LI|DT|DD|FIGCAPTION|BUTTON|SUMMARY)$/.test(e.tagName)){
          const text=e.innerText?.replace(/\n+/g,' / ').replace(/\s+/g,' ').trim();
          if(text)rows.push({type:e.tagName.toLowerCase(),text,section:e.closest('section')?.id||''});return;
        }
        for(const child of e.childNodes)walk(child);
      };walk(main);return rows;
    });
    copy.push({label,url,blocks});
   }
   results.push({label,url,viewport,...checks,errors,failures});
   console.log(id,JSON.stringify({broken:checks.broken.length,overflow:checks.overflow.length,distorted:checks.distorted.length,deadAnchors:checks.deadAnchors.length,errors:errors.length,failures:failures.length}));
   await page.close();
  }
  await context.close();
 }
 fs.writeFileSync(path.join(out,'checks.json'),JSON.stringify(results,null,2));
 fs.writeFileSync(path.join(out,'copy.json'),JSON.stringify(copy,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
