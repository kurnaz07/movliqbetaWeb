document.addEventListener('DOMContentLoaded', function() {
    // Hero içeriğine fade-in efekti
    setTimeout(function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    }, 300);

    // Email geçerlilik kontrolü
    const form = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Email doğrulama
            const emailValue = emailInput.value.trim();
            if (!validateEmail(emailValue)) {
                e.preventDefault(); // Formu göndermeyi engelle
            emailInput.classList.add('shake');
            setTimeout(() => {
                emailInput.classList.remove('shake');
            }, 500);
                return false;
        }
        
            // E-posta geçerliyse gönderime izin ver (form action'daki URL'e gönderilecek)
            return true;
        });
    }
    
    // Email doğrulama fonksiyonu
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Parallax effect for background
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `${x * 10}% ${y * 10}%`;
    });
}); 