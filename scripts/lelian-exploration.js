(() => {
  const exploration = document.querySelector(".html-exploration");
  const rail = exploration?.querySelector(".html-exploration__rail");
  const index = exploration?.querySelector(".html-exploration__index");

  document.querySelector(".case-page")?.classList.add("lelian-case");
  document.querySelector(".lelian-operations__handoff")?.remove();

  if (rail && index) {
    rail.querySelectorAll("#exploration-03, #exploration-04, #exploration-05, #exploration-06").forEach((slide) => slide.remove());

    const directions = [
      {
        number: "03",
        label: "COLLECTION HUB",
        description: "先展示完整商品体系，验证用户能否快速理解全部选择。",
        source: "../assets/portfolio/lelian/page-explorations/collection-hub.html",
        browserLabel: "AI HTML / COLLECTION V1",
        title: "LELIAN Collection Hub AI 探索页面",
        status: "COMPARE",
        takeaway: "商品展示完整，但首次进入时不容易选择。",
      },
      {
        number: "04",
        label: "GUIDED COLLECTION",
        description: "从用户需求进入商品，减少一次看到的选项。",
        source: "../assets/portfolio/lelian/page-explorations/collection-finder.html",
        browserLabel: "AI HTML / COLLECTION V2",
        title: "LELIAN Guided Collection AI 探索页面",
        status: "REFINE",
        takeaway: "分类引导更清楚，保留这个方向。",
      },
      {
        number: "05",
        label: "PDP STRUCTURE",
        description: "先建立完整购买模块，验证产品信息与购买动作。",
        source: "../assets/portfolio/lelian/page-explorations/pdp-v1.html",
        browserLabel: "AI HTML / PDP V1",
        title: "LELIAN PDP Structure AI 探索页面",
        status: "COMPARE",
        takeaway: "功能齐全，信息顺序仍需调整。",
      },
      {
        number: "06",
        label: "PDP REFINEMENT",
        description: "统一层级、品牌表达与购买动作，形成最终方向。",
        source: "../assets/portfolio/lelian/page-explorations/pdp-v2.html",
        browserLabel: "AI HTML / PDP V2",
        title: "LELIAN PDP Refinement AI 探索页面",
        status: "SELECTED",
        takeaway: "集中产品说明、规格和购买选项，作为后续开发基础。",
        selected: true,
      },
    ];

    const fragment = document.createDocumentFragment();
    directions.forEach((direction) => {
      const slide = document.createElement("article");
      slide.className = `html-exploration__slide${direction.selected ? " is-selected" : ""}`;
      slide.id = `exploration-${direction.number}`;
      slide.innerHTML = `
        <header>
          <div><span>${direction.number}</span><strong>${direction.label}</strong></div>
          <p>${direction.description}</p>
        </header>
        <div class="html-exploration__browser">
          <div><i></i><i></i><i></i><span>${direction.browserLabel}</span><a href="${direction.source}" target="_blank" rel="noreferrer">OPEN ↗</a></div>
          <iframe src="${direction.source}" title="${direction.title}" loading="lazy"></iframe>
        </div>
        <footer><span>${direction.status}</span><p>${direction.takeaway}</p></footer>`;
      fragment.append(slide);
    });
    rail.append(fragment);
    rail.querySelectorAll(":scope > .html-exploration__slide > header").forEach((header) => header.remove());
    index.remove();
    exploration.classList.add("html-exploration--headerless");
    rail.setAttribute("aria-label", "六个 AI 页面探索版本，可横向滚动");
  }

  const buildSection = document.querySelector("#build-pipeline");
  const dialogue = buildSection?.querySelector(".codex-proof");
  if (exploration && dialogue) dialogue.before(exploration);

  const sceneGrid = document.querySelector(".ai-scene-grid");
  sceneGrid?.querySelector(".ai-scene-grid__intro")?.remove();
  sceneGrid?.classList.add("ai-scene-grid--media-only");

  const contentKicker = document.querySelector(".lelian-ai-content__head .case-kicker");
  if (contentKicker) contentKicker.textContent = "03 · AI CONTENT PRODUCTION";

  document.querySelector("#page-exploration")?.remove();

  const finalOutput = exploration?.querySelector(".html-exploration__final");
  const results = document.querySelector("#results");
  if (finalOutput && results) {
    const liveHero = finalOutput.querySelector(".storefront-output__hero");
    if (liveHero) {
      liveHero.classList.add("storefront-output__live");
      liveHero.innerHTML = `
        <div class="storefront-live-browser">
          <div class="storefront-live-browser__bar"><i></i><i></i><i></i><span>LELIANBRACELETS.COM</span><a href="https://lelianbracelets.com/" target="_blank" rel="noreferrer">LIVE SITE ↗</a></div>
          <iframe src="../assets/portfolio/lelian/live-storefront/index.html" title="LELIAN 已上线 Shopify 首页" loading="lazy" sandbox></iframe>
        </div>
        <figcaption><span>HOMEPAGE</span><strong>品牌介绍与购物入口 · 图内可滚动查看</strong></figcaption>`;
    }
    const stage = document.createElement("section");
    stage.className = "case-section storefront-final-stage";
    stage.id = "results";
    const wrap = document.createElement("div");
    wrap.className = "case-wrap";
    stage.append(wrap);
    wrap.append(finalOutput);
    results.before(stage);
    results.remove();
  }
})();
