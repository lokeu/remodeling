document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.review-carousel');
    if (!carousel) return;

    const trackWrap = carousel.querySelector('.review-track-wrap');
    const track     = carousel.querySelector('.review-track');
    const cards     = [...carousel.querySelectorAll('.review-card')];
    const prevBtn   = carousel.querySelector('.carousel-prev');
    const nextBtn   = carousel.querySelector('.carousel-next');
    const dotsWrap  = carousel.querySelector('.carousel-dots');

    const GAP = 30;
    let currentPage = 0;

    const getPerPage   = () => window.innerWidth <= 768 ? 1 : 3;
    const getPageCount = () => Math.ceil(cards.length / getPerPage());

    const layout = () => {
        const perPage = getPerPage();
        const wrapW   = trackWrap.offsetWidth;
        const cardW   = (wrapW - (perPage - 1) * GAP) / perPage;
        cards.forEach(card => { card.style.width = `${cardW}px`; });
    };

    const updateUI = () => {
        const pageCount = getPageCount();
        dotsWrap.innerHTML = '';
        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === currentPage ? ' active' : '');
            dot.setAttribute('aria-label', `${i + 1}페이지`);
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        }
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === pageCount - 1;
    };

    const goTo = (page) => {
        const pageCount = getPageCount();
        currentPage = Math.max(0, Math.min(page, pageCount - 1));
        const wrapW = trackWrap.offsetWidth;
        track.style.transform = `translateX(-${currentPage * (wrapW + GAP)}px)`;
        updateUI();
    };

    prevBtn.addEventListener('click', () => goTo(currentPage - 1));
    nextBtn.addEventListener('click', () => goTo(currentPage + 1));

    // 터치 스와이프
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(currentPage + (diff > 0 ? 1 : -1));
    });

    window.addEventListener('resize', () => { layout(); goTo(0); });

    layout();
    updateUI();
});
