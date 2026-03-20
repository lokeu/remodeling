document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.ba-slider-container');
    if (!sliders.length) return;

    sliders.forEach(container => {
        const input      = container.querySelector('.ba-slider-input');
        const afterImage = container.querySelector('.ba-after');
        const handle     = container.querySelector('.ba-handle');

        if (input && afterImage && handle) {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                afterImage.style.clipPath = `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
                handle.style.left = `${value}%`;
            });
        }
    });
});
