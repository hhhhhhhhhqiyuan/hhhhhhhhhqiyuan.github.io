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
        description: "Start with the full catalog to review how clearly the range is organized.",
        source: "../../assets/portfolio/lelian/page-explorations/collection-hub.html",
        browserLabel: "AI HTML / COLLECTION V1",
        title: "LELIAN AI-assisted collection hub exploration",
        status: "COMPARE",
        takeaway: "The full range is visible, but first-time selection needs clearer guidance.",
      },
      {
        number: "04",
        label: "GUIDED COLLECTION",
        description: "Start with the shopper’s needs and show fewer choices at a time.",
        source: "../../assets/portfolio/lelian/page-explorations/collection-finder.html",
        browserLabel: "AI HTML / COLLECTION V2",
        title: "LELIAN AI-assisted guided collection exploration",
        status: "REFINE",
        takeaway: "Clearer category guidance. Retain this direction.",
      },
      {
        number: "05",
        label: "PDP STRUCTURE",
        description: "Build the purchase module first, then review product information and actions.",
        source: "../../assets/portfolio/lelian/page-explorations/pdp-v1.html",
        browserLabel: "AI HTML / PDP V1",
        title: "LELIAN AI-assisted product page structure exploration",
        status: "COMPARE",
        takeaway: "The functions are in place; the information order needs refinement.",
      },
      {
        number: "06",
        label: "PDP REFINEMENT",
        description: "Align hierarchy, brand expression and purchase actions in the final direction.",
        source: "../../assets/portfolio/lelian/page-explorations/pdp-v2.html",
        browserLabel: "AI HTML / PDP V2",
        title: "LELIAN AI-assisted product page refinement",
        status: "SELECTED",
        takeaway: "Group the product explanation, specifications and purchase options for development.",
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
    rail.setAttribute("aria-label", "Six AI-assisted page explorations; browse horizontally");
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
          <iframe src="../../assets/portfolio/lelian/live-storefront/index.html" title="LELIAN launched Shopify homepage" loading="lazy" sandbox></iframe>
        </div>
        <figcaption><span>HOMEPAGE</span><strong>Brand introduction & shopping paths · Scroll inside the preview</strong></figcaption>`;
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
