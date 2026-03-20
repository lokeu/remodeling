document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const phone   = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();

        if (!name || !phone || !address) {
            alert('성함, 연락처, 지역을 모두 입력해 주세요.');
            return;
        }

        const formSection = form.closest('.contact-form-section');
        if (formSection) {
            const container = formSection.querySelector('.container');
            if (container) {
                container.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">✅</div>
                        <h2>상담 신청이 완료되었습니다!</h2>
                        <p>입력하신 연락처로 빠른 시일 내에 연락드리겠습니다.<br>급한 문의는 아래로 직접 연락 주세요.</p>
                        <div class="success-actions">
                            <a href="tel:010-0000-0000" class="btn-primary">📞 010-0000-0000 전화하기</a>
                            <a href="index.html" class="btn-outline">홈으로 돌아가기</a>
                        </div>
                    </div>
                `;
            }
        }
    });
});
