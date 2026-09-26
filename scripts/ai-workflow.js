(() => {
  const board = document.querySelector('.flow-board');
  if (!board) return;
  const cards = [...board.querySelectorAll('.step')];
  const svg = board.querySelector('.flow-lines');
  const paths = svg.querySelector('[data-paths]');
  const revision = board.querySelector('.loop-label--revision');
  const reuse = board.querySelector('.loop-label--reuse');
  const pass = board.querySelector('.pass-label');
  let frame;
  const draw = () => {
    const origin = board.getBoundingClientRect();
    const rects = cards.map(card => {
      const box = card.getBoundingClientRect();
      const trigger = card.querySelector('.step-trigger').getBoundingClientRect();
      return {left:box.left-origin.left, right:box.right-origin.left, top:box.top-origin.top,
        bottom:box.bottom-origin.top, port:trigger.top-origin.top+trigger.height/2};
    });
    svg.setAttribute('viewBox', `0 0 ${origin.width} ${origin.height}`);
    paths.replaceChildren();
    const path = (d, className) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg','path');
      node.setAttribute('d', d); node.setAttribute('class', className); paths.append(node);
    };
    const center = (rects[0].left+rects[0].right)/2;
    rects.slice(0,-1).forEach((from,i) => {
      path(`M ${center} ${from.bottom+3} V ${rects[i+1].top-7}`, 'flow-main');
    });
    const left = rects[0].left/2;
    const right = (origin.width+rects[0].right)/2;
    path(`M ${rects[4].left-2} ${rects[4].port} H ${left} V ${rects[3].port} H ${rects[3].left-6}`, 'flow-loop');
    path(`M ${rects[7].right+2} ${rects[7].port} H ${right} V ${rects[0].port} H ${rects[0].right+6}`, 'flow-loop');
    revision.style.left = `${left}px`; revision.style.top = `${(rects[3].port+rects[4].port)/2}px`;
    reuse.style.left = `${right}px`; reuse.style.top = `${(rects[0].port+rects[7].port)/2}px`;
    pass.style.left = `${center+12}px`; pass.style.top = `${(rects[4].bottom+rects[5].top)/2}px`;
  };
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
  board.querySelectorAll('.step-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
      schedule();
    });
  });
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(board);
    cards.forEach(card => observer.observe(card));
  }
  window.addEventListener('resize', schedule);
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();
