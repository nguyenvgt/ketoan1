// Simple Home JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Home JS loaded');
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuOverlay.classList.remove('active');
            });
        });
    }
    
    // Scroll Indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = scrolled + '%';
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Home JS initialized successfully');
    
    // Calculator Functionality
    window.calculateCost = function() {
        const revenue = parseFloat(document.getElementById('revenue').value) || 0;
        const transactions = parseFloat(document.getElementById('transactions').value) || 0;
        const businessType = document.getElementById('businessType').value;
        
        if (revenue === 0 || transactions === 0) {
            alert('Vui lòng nhập đầy đủ thông tin để tính toán!');
            return;
        }
        
        // Calculation logic
        let baseCost = 0;
        let multiplier = 1;
        
        switch (businessType) {
            case 'small':
                baseCost = 2000000;
                multiplier = 1;
                break;
            case 'medium':
                baseCost = 5000000;
                multiplier = 1.5;
                break;
            case 'large':
                baseCost = 10000000;
                multiplier = 2;
                break;
        }
        
        const transactionCost = transactions * 5000;
        const revenueCost = revenue * 0.001;
        const totalCost = (baseCost + transactionCost + revenueCost) * multiplier;
        const savings = totalCost * 0.3;
        
        // Display results
        document.getElementById('calculatorResult').innerHTML = `
            <div class="result-content">
                <div class="result-icon">💰</div>
                <h4 class="result-title">Kết Quả Ước Tính</h4>
                <div class="result-details">
                    <div class="result-row">
                        <span>Chi phí dịch vụ/tháng:</span>
                        <span class="result-value">${totalCost.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div class="result-row">
                        <span>Tiết kiệm được:</span>
                        <span class="result-value savings">${savings.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div class="result-row highlight">
                        <span>Chi phí thực tế:</span>
                        <span class="result-value highlight">${(totalCost - savings).toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                </div>
                <button class="contact-btn" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                    📞 Liên Hệ Tư Vấn Chi Tiết
                </button>
            </div>
        `;
    };
    
    // Form submission
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 2 giờ.');
            this.reset();
        });
    }
    
    // Counter animation
    const counters = document.querySelectorAll('[data-counter]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }
});