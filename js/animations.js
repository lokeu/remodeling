document.addEventListener('DOMContentLoaded', () => {

    // 숫자 카운터 애니메이션 (stats-section)
    const initStatCounters = () => {
        const statSection = document.querySelector('.stats-section');
        if (!statSection) return;

        const easeOutExpo = (t) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

        const animateCounter = (el, from, to, duration) => {
            // 텍스트 노드만 교체 (stat-unit span은 그대로 유지)
            const textNode = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
            if (!textNode) return;

            const startTime = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                textNode.textContent = Math.round(from + (to - from) * easeOutExpo(progress));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.querySelectorAll('.stat-number').forEach(el => {
                    const to   = parseInt(el.textContent, 10);
                    const from = parseInt(el.dataset.from ?? '0', 10);
                    animateCounter(el, from, to, 1800);
                });
                observer.disconnect(); // 한 번만 실행
            });
        }, { threshold: 0.4 });

        observer.observe(statSection);
    };

    // 스크롤 진입 fade-in
    const initFadeIn = () => {
        const scrollSels = [
            '.stats-section .container',
            '.section-header',
            '.ba-slider-container',
            '.link-wrap',
            '.review-carousel',
            '.object.man-01',
            '.object.man-02'
        ];
        const scrollEls = document.querySelectorAll(scrollSels.join(', '));
        if (!scrollEls.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        scrollEls.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    };

    initStatCounters();
    initFadeIn();
});
