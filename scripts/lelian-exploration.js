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
        takeaway: "商品全貌清楚，但第一次进入时的选择成本较高。",
      },
      {
        number: "04",
        label: "GUIDED COLLECTION",
        description: "从用户需求进入商品，减少一次看到的选项。",
        source: "../assets/portfolio/lelian/page-explorations/collection-finder.html",
        browserLabel: "AI HTML / COLLECTION V2",
        title: "LELIAN Guided Collection AI 探索页面",
        status: "REFINE",
        takeaway: "筛选路径更容易理解，继续保留引导式结构。",
      },
      {
        number: "05",
        label: "PDP STRUCTURE",
        description: "先建立完整购买模块，验证产品信息与购买动作。",
        source: "../assets/portfolio/lelian/page-explorations/pdp-v1.html",
        browserLabel: "AI HTML / PDP V1",
        title: "LELIAN PDP Structure AI 探索页面",
        status: "COMPARE",
        takeaway: "功能完整，但信息语气与阅读节奏还需要统一。",
      },
      {
        number: "06",
        label: "PDP REFINEMENT",
        description: "统一层级、品牌表达与购买动作，形成最终方向。",
        source: "../assets/portfolio/lelian/page-explorations/pdp-v2.html",
        browserLabel: "AI HTML / PDP V2",
        title: "LELIAN PDP Refinement AI 探索页面",
        status: "SELECTED",
        takeaway: "产品价值、选项与购买路径完成收敛。",
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
  const buildHead = buildSection?.querySelector(".commerce-pipeline__head");
  const buildCards = buildSection?.querySelector(".commerce-pipeline__cards");
  if (exploration && buildCards) buildCards.before(exploration);

  if (buildHead) {
    const title = buildHead.querySelector("h2");
    const description = buildHead.querySelector("h2 + p");
    if (title) title.textContent = "先用 AI 探索 UI，再由我筛选修改，最后借助 Codex 开发并上线。";
    if (description) description.textContent = "Figma Make 根据我定义的页面结构与组件需求生成 UI 方向；我负责筛选和修改，Codex 完成响应式代码，AI 补齐场景图片，最终上传到 Shopify。";
  }

  const buildCard = buildSection?.querySelector(".commerce-pipeline__card--codex");
  if (buildCard) {
    const kicker = buildCard.querySelector("header > span");
    const title = buildCard.querySelector("header > h3");
    const description = buildCard.querySelector("header > p");
    if (kicker) kicker.textContent = "02B · CODEX RESPONSIVE BUILD";
    if (title) title.textContent = "筛选 UI 后，再进入编码、内容生成和上线。";
    if (description) description.textContent = "我把选中的 UI 方向整理成页面和断点规则，再让 Codex 实现桌面、平板与手机页面；代码稳定后，用 AI 生成场景图片并替换到 Shopify。";

    const visualHead = buildCard.querySelector(".commerce-pipeline__visual-head");
    if (visualHead) visualHead.innerHTML = "<strong>DESIGNER-LED WORKFLOW</strong><span>FROM UI TO LIVE</span>";

    const stages = buildCard.querySelector(".build-console__stages");
    if (stages) {
      stages.innerHTML = `
        <li><span>01</span><div><strong>FIGMA / STRUCTURE</strong><p>定义页面结构、组件需求和购买路径</p></div></li>
        <li><span>02</span><div><strong>FIGMA MAKE / UI DIRECTIONS</strong><p>快速生成多个可浏览 UI 方向</p></div></li>
        <li><span>03</span><div><strong>HUMAN / SELECT + REFINE</strong><p>筛选、修改并确认最终设计规则</p></div></li>
        <li class="is-codex"><span>04</span><div><strong>CODEX / RESPONSIVE CODE</strong><p>实现 HTML、CSS 与桌面到手机断点</p></div></li>
        <li><span>05</span><div><strong>AI CONTENT / SHOPIFY</strong><p>生成并替换图片，逐屏 QA 后上线</p></div></li>`;
    }

    const capability = buildCard.querySelector(".commerce-pipeline__capability p");
    if (capability) capability.textContent = "我的能力不是自动生成页面，而是定义结构和规则、筛选方向、把设计要求交给 Codex，并对响应式结果与上线质量负责。";
    buildCard.querySelector(".commerce-pipeline__result--live")?.remove();
  }

  const sceneGrid = document.querySelector(".ai-scene-grid");
  sceneGrid?.querySelector(".ai-scene-grid__intro")?.remove();
  sceneGrid?.classList.add("ai-scene-grid--media-only");

  const contentHead = document.querySelector(".lelian-ai-content__head");
  if (contentHead) {
    const kicker = contentHead.querySelector(".case-kicker");
    const title = contentHead.querySelector("h2");
    const description = contentHead.querySelector("h2 + p");
    if (kicker) kicker.textContent = "03 · AI CONTENT PRODUCTION";
    if (title) title.textContent = "代码完成后，我用 AI 补齐佩戴场景，再筛选图片并替换上线。";
    if (description) description.textContent = "这些图片不是独立的视觉练习，而是用于验证目标用户、使用场景和商品颜色，并最终进入真实首页与营销内容。";
  }

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
        <figcaption><span>LIVE STOREFRONT</span><strong>真实上线页面，可在框内滚动查看</strong></figcaption>`;
    }
    const stage = document.createElement("section");
    stage.className = "case-section storefront-final-stage";
    const wrap = document.createElement("div");
    wrap.className = "case-wrap";
    stage.append(wrap);
    wrap.append(finalOutput);
    results.before(stage);
  }
})();
