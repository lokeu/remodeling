document.addEventListener('DOMContentLoaded', () => {
    const filterBtns     = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                item.style.display = (filterValue === 'all' || filterValue === category)
                    ? 'block'
                    : 'none';
            });
        });
    });
});
