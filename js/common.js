document.addEventListener('DOMContentLoaded', () => {
    // 공통 컴포넌트 로드 (헤더, 푸터)
    const loadComponent = (id, url) => {
        const el = document.getElementById(id);
        if (!el) return;
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.text();
            })
            .then(html => { el.innerHTML = html; })
            .catch(err => console.error(`Error loading ${url}:`, err));
    };

    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');

    // 파비콘 공통 주입
    const favicon = document.createElement('link');
    favicon.rel  = 'icon';
    favicon.href = 'favicon.ico';
    document.head.appendChild(favicon);
});
