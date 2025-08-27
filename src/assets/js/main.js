// Component Loader
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    // Load component từ file HTML
    async loadComponent(name, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            this.components[name] = html;
            return html;
        } catch (error) {
            console.error(`Error loading component ${name}:`, error);
            return `<div class="error">Error loading ${name} component</div>`;
        }
    }

    // Render component vào element
    renderComponent(name, targetElement) {
        if (this.components[name]) {
            targetElement.innerHTML = this.components[name];
            return true;
        }
        return false;
    }

    // Load và render component
    async loadAndRender(name, filePath, targetElement) {
        await this.loadComponent(name, filePath);
        this.renderComponent(name, targetElement);
    }
}

// Khởi tạo component loader
const componentLoader = new ComponentLoader();

// Load tất cả components khi trang được load
document.addEventListener('DOMContentLoaded', async function() {
    // Load header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        await componentLoader.loadAndRender('header', 'components/header.html', headerContainer);
        initializeHeader();
    }

    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        await componentLoader.loadAndRender('footer', 'components/footer.html', footerContainer);
        initializeFooter();
    }

    // Chỉ load content component cho các trang khác (không phải trang chủ)
    const contentContainer = document.getElementById('content-container');
    if (contentContainer && !isHomePage()) {
        const currentPage = getCurrentPage();
        await loadPageContent(currentPage, contentContainer);
    } else if (isHomePage()) {
        // Trang chủ: khởi tạo các tính năng đặc biệt
        initializeHomeFeatures();
    }
});

// Kiểm tra có phải trang chủ không
function isHomePage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename === 'index.html' || filename === '';
}

// Xác định trang hiện tại
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('download.html')) {
        return 'download';
    }
    return 'home';
}

// Load nội dung trang
async function loadPageContent(pageName, container) {
    switch (pageName) {
        case 'download':
            await componentLoader.loadAndRender('download-content', 'components/download-content.html', container);
            break;
        case 'home':
        default:
            // Trang chủ không cần load content component
            break;
    }
}

// Khởi tạo header
function initializeHeader() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    // Scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollIndicator.style.width = scrollPercent + '%';
        });
    }
    
    // Smooth scrolling cho anchor links
    const allNavLinks = document.querySelectorAll('nav a, .mobile-menu-overlay a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Chỉ xử lý anchor links (bắt đầu bằng #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll đến target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Khởi tạo footer
function initializeFooter() {
    // Mobile CTA button
    const mobileCtaBtn = document.querySelector('.mobile-cta-btn');
    if (mobileCtaBtn) {
        mobileCtaBtn.addEventListener('click', function() {
            // Scroll to contact section or navigate to contact page
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = 'contact.html';
            }
        });
    }
}

// Khởi tạo các tính năng đặc biệt cho từng trang
function initializePageFeatures(pageName) {
    switch (pageName) {
        case 'home':
            initializeHomeFeatures();
            break;
        case 'download':
            initializeDownloadFeatures();
            break;
    }
}

// Khởi tạo tính năng trang chủ (được gọi trực tiếp cho trang chủ)
function initializeHomeFeatures() {
    // Banner slider
    initializeBannerSlider();
    
    // Statistics counter
    initializeStatisticsCounter();
    
    // Calculator
    initializeCalculator();
    
    // Contact form
    initializeContactForm();
}

// Khởi tạo banner slider
function initializeBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.banner-indicator');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    
    if (!slides.length) return; // Không có slides thì return
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-play
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Manual navigation
    if (prevBtn) prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Khởi tạo statistics counter
function initializeStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statNumbers.length) return; // Không có stats thì return
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-counter'));
                animateCounter(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate counter
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Khởi tạo calculator
function initializeCalculator() {
    // Calculator logic sẽ được load từ home.js
    if (typeof calculateCost === 'function') {
        console.log('Calculator initialized');
    }
}

// Khởi tạo contact form
function initializeContactForm() {
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            alert('Cảm ơn bạn đã gửi yêu cầu tư vấn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.');
        });
    }
}

// Khởi tạo các tính năng khác (placeholder)
function initializeServicesFeatures() {
    console.log('Services page features initialized');
}

function initializeCalculatorFeatures() {
    console.log('Calculator page features initialized');
}

function initializeAboutFeatures() {
    console.log('About page features initialized');
}

function initializeContactFeatures() {
    console.log('Contact page features initialized');
}

// Khởi tạo tính năng trang download
function initializeDownloadFeatures() {
    // Có thể thêm các tính năng đặc biệt cho trang download ở đây
    console.log('Download page features initialized');
}

// Export cho sử dụng global
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;
