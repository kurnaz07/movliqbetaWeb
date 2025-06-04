document.addEventListener('DOMContentLoaded', function() {
    // Hero içeriğine fade-in efekti
    setTimeout(function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    }, 300);

    // Email geçerlilik kontrolü ve AJAX gönderimi
    const form = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-btn'); // Butonu al
    const successMessageDiv = document.getElementById('success-message'); // Başarı mesajı div'ini al

    if (form && emailInput && submitButton && successMessageDiv) { // Elementlerin varlığını kontrol et
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Her durumda default gönderimi engelle

            const emailValue = emailInput.value.trim();
            if (!validateEmail(emailValue)) {
                emailInput.classList.add('shake');
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 500);
                return; // Validasyon başarısızsa işlemi durdur
            }

            const originalButtonHTML = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Gönderiliyor...';

            const formData = new FormData(form);
            
            let actionUrl = form.action;
            // FormSubmit.co AJAX endpoint'ini oluştur
            if (actionUrl.includes('formsubmit.co/') && !actionUrl.includes('/ajax/')) {
                actionUrl = actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');
            }

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // Yanıt başarılı değilse, FormSubmit'ten JSON hata mesajını ayrıştırmaya çalış
                return response.json().then(errData => { 
                    throw new Error(errData.message || 'Form gönderilemedi. Lütfen tekrar deneyin.'); 
                });
            })
            .then(data => {
                console.log('FormSubmit Success:', data);
                if (form) form.style.display = 'none'; // Formu gizle
                if (successMessageDiv) successMessageDiv.style.display = 'block'; // Başarı mesajını göster
                // Buton devre dışı ve gizli form ile kalır. İstenirse burada sıfırlanabilir.
            })
            .catch(error => {
                console.error('FormSubmit Error:', error);
                alert('Bir hata oluştu: ' + error.message);
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHTML; // Hata durumunda butonu eski haline getir
            });
        });
    }

    // Email doğrulama fonksiyonu
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Parallax effect for background
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Arka planın null olup olmadığını kontrol et
        if (document.body.style.backgroundPosition !== null && document.body.style.backgroundPosition !== undefined) {
            document.body.style.backgroundPosition = `${x * 5}% ${y * 5}%`; // Efekti biraz azalttım
        }
    });
}); 