(() => {
  const video = document.querySelector('.sunon-video video');
  if (!video) return;
  // Playback is user initiated; leaving the section never starts it again.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
  window.addEventListener('pagehide', () => video.pause());
})();
