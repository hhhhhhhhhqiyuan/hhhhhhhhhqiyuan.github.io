(() => {
  const dialog = document.querySelector("[data-media-dialog]");
  const body = dialog?.querySelector("[data-dialog-body]");
  const title = dialog?.querySelector("[data-dialog-title]");

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const track = gallery.querySelector(".gallery");
    gallery.querySelector("[data-prev]")?.addEventListener("click", () => {
      track.scrollBy({ left: -track.clientWidth * 0.72, behavior: "smooth" });
    });
    gallery.querySelector("[data-next]")?.addEventListener("click", () => {
      track.scrollBy({ left: track.clientWidth * 0.72, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-full-image]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!dialog || !body) return;
      title.textContent = trigger.dataset.label || "查看完整设计";
      const image = document.createElement("img");
      image.src = trigger.dataset.fullImage;
      image.alt = trigger.dataset.label || "完整页面设计";
      body.replaceChildren(image);
      dialog.showModal();
    });
  });

  document.querySelectorAll("[data-html-demo]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!dialog || !body) return;
      title.textContent = trigger.dataset.label || "可滚动页面 Demo";
      const frame = document.createElement("iframe");
      frame.src = trigger.dataset.htmlDemo;
      frame.title = title.textContent;
      body.replaceChildren(frame);
      dialog.showModal();
    });
  });

  dialog?.querySelector("[data-dialog-close]")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("close", () => body?.replaceChildren());
})();
