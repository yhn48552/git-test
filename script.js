(function () {
  const track = document.getElementById('track');
  const cards = Array.from(track.querySelectorAll('.product-card'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dots');
  const viewport = document.querySelector('.carousel-viewport');

  let index = 0;
  let dots = [];

  function getStep() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    return cardWidth + gap;
  }

  function getVisibleCount() {
    const step = getStep();
    return Math.max(1, Math.floor(viewport.clientWidth / step));
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    dots = [];
    const maxIndex = getMaxIndex();
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.addEventListener('click', () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
  }

  function update() {
    const maxIndex = getMaxIndex();
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    const step = getStep();
    track.style.transform = `translateX(${-index * step}px)`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', () => {
    buildDots();
    update();
  });

  buildDots();
  update();
})();
