// Simple Image Loader

class SimpleImageLoader {
    constructor() {
        this.imageFolder = 'image/';
        this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
        this.bannerSlides = document.querySelectorAll('.banner-slide');
    }
    
    async init() {
        console.log('Loading images...');
        
        // Try to load common images
        await this.loadImages();
        
        console.log('Image loading completed');
    }
    
    async loadImages() {
        const commonNames = ['banner1', 'banner2', 'banner3'];
        
        for (let i = 0; i < this.bannerSlides.length && i < commonNames.length; i++) {
            const slide = this.bannerSlides[i];
            const name = commonNames[i];
            
            // Try different formats
            for (const format of this.supportedFormats) {
                const imagePath = `${this.imageFolder}${name}${format}`;
                if (await this.testImage(imagePath)) {
                    slide.style.backgroundImage = `url('${imagePath}')`;
                    console.log(`Loaded: ${imagePath}`);
                    break;
                }
            }
        }
    }
    
    async testImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            
            setTimeout(() => resolve(false), 1000);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting Image Loader...');
    new SimpleImageLoader();
});
