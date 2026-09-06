(() => {
  const demo = document.querySelector("[data-dtc-demo]");
  if (!demo) return;

  const frame = demo.querySelector("[data-dtc-frame]");
  const tabs = [...demo.querySelectorAll("[data-page-src]")];
  const progress = demo.querySelector("[data-dtc-progress]");
  const status = demo.querySelector("[data-dtc-status]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let inView = false;
  let loaded = false;
  let pausedUntil = 0;
  let lastFrame = 0;
  let animationFrame = 0;
  let internalWindow = null;

  const setStatus = (isPaused) => {
    status.textContent = isPaused ? "PAUSED · SCROLL MANUALLY" : "AUTO SCROLL";
    status.parentElement.classList.toggle("is-paused", isPaused);
  };

  const getPageState = () => {
    try {
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      if (!doc || !win) return null;
      const root = doc.documentElement;
      const body = doc.body;
      const height = Math.max(root.scrollHeight, body?.scrollHeight || 0);
      return { win, max: Math.max(0, height - win.innerHeight) };
    } catch (_error) {
      return null;
    }
  };

  const updateProgress = () => {
    const page = getPageState();
    if (!page || page.max <= 0) {
      progress.style.width = "0%";
      return;
    }
    progress.style.width = `${Math.min(100, (page.win.scrollY / page.max) * 100)}%`;
  };

  const pause = (duration = 7000) => {
    pausedUntil = performance.now() + duration;
    setStatus(true);
  };

  const loop = (time) => {
    animationFrame = requestAnimationFrame(loop);
    if (!loaded || !inView || reduceMotion.matches) return;

    if (time < pausedUntil) {
      updateProgress();
      return;
    }

    setStatus(false);
    const page = getPageState();
    if (!page || page.max <= 0) return;

    if (!lastFrame) lastFrame = time;
    const elapsed = Math.min(50, time - lastFrame);
    lastFrame = time;

    if (page.win.scrollY >= page.max - 2) {
      page.win.scrollTo({ top: 0, behavior: "smooth" });
      pausedUntil = time + 2200;
      updateProgress();
      return;
    }

    page.win.scrollBy(0, elapsed * 0.048);
    updateProgress();
  };

  const bindManualControls = () => {
    try {
      if (internalWindow === frame.contentWindow) return;
      internalWindow = frame.contentWindow;
      ["wheel", "touchstart", "pointerdown", "keydown"].forEach((eventName) => {
        internalWindow.addEventListener(eventName, () => pause(), { passive: true });
      });
      internalWindow.addEventListener("scroll", updateProgress, { passive: true });
    } catch (_error) {
      internalWindow = null;
    }
  };

  frame.addEventListener("load", () => {
    loaded = true;
    lastFrame = 0;
    pausedUntil = performance.now() + 1100;
    try {
      frame.contentWindow.scrollTo(0, 0);
    } catch (_error) {
      // The sandbox keeps the embedded page inert; scrolling still degrades safely.
    }
    bindManualControls();
    updateProgress();
  });

  frame.addEventListener("mouseenter", () => pause());
  frame.addEventListener("pointerdown", () => pause());
  frame.addEventListener("touchstart", () => pause(), { passive: true });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.getAttribute("aria-selected") === "true") return;
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      loaded = false;
      progress.style.width = "0%";
      status.textContent = "LOADING PAGE";
      status.parentElement.classList.add("is-paused");
      frame.title = tab.dataset.pageTitle;
      frame.src = tab.dataset.pageSrc;
    });
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.28;
      lastFrame = 0;
      if (inView) pausedUntil = performance.now() + 700;
    },
    { threshold: [0, 0.28, 0.55] }
  );

  observer.observe(demo);
  reduceMotion.addEventListener?.("change", () => setStatus(reduceMotion.matches));
  if (reduceMotion.matches) setStatus(true);
  animationFrame = requestAnimationFrame(loop);

  window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame), { once: true });
})();
