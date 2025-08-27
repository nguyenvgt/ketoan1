// Download functionality
function downloadSoftware(softwareId, softwareName) {
    // Hiển thị thông báo đang tải
    showDownloadNotification(softwareName);
    
    // Simulate download process (trong thực tế sẽ redirect đến file thực)
    setTimeout(() => {
        // Có thể thay thế bằng URL thực của file
        const downloadUrl = `#download-${softwareId}`;
        
        // Tạo link tải về ẩn
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${softwareName}.zip`;
        link.style.display = 'none';
        
        // Thêm vào DOM và click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Hiển thị thông báo thành công
        showSuccessNotification(softwareName);
        
        // Log download event
        console.log(`Download started: ${softwareName} (${softwareId})`);
        
    }, 1500);
}

// Hiển thị thông báo đang tải
function showDownloadNotification(softwareName) {
    // Tạo notification element
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">📥</div>
            <div class="notification-text">
                <h4>Đang tải về...</h4>
                <p>${softwareName}</p>
            </div>
        </div>
    `;
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Hiển thị với animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Hiển thị thông báo thành công
function showSuccessNotification(softwareName) {
    // Ẩn notification đang tải
    const downloadNotification = document.querySelector('.download-notification');
    if (downloadNotification) {
        downloadNotification.classList.remove('show');
        setTimeout(() => {
            if (downloadNotification.parentNode) {
                downloadNotification.parentNode.removeChild(downloadNotification);
            }
        }, 300);
    }
    
    // Tạo notification thành công
    const successNotification = document.createElement('div');
    successNotification.className = 'success-notification';
    successNotification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✅</div>
            <div class="notification-text">
                <h4>Tải về thành công!</h4>
                <p>${softwareName} đã được tải về máy của bạn</p>
            </div>
        </div>
    `;
    
    // Thêm vào body
    document.body.appendChild(successNotification);
    
    // Hiển thị với animation
    setTimeout(() => {
        successNotification.classList.add('show');
    }, 100);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        successNotification.classList.remove('show');
        setTimeout(() => {
            if (successNotification.parentNode) {
                successNotification.parentNode.removeChild(successNotification);
            }
        }, 300);
    }, 3000);
}

// Thêm CSS cho notification
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .download-notification,
        .success-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            padding: 1.5rem;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            border: 1px solid var(--border-color);
        }
        
        .download-notification.show,
        .success-notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-icon {
            font-size: 2rem;
        }
        
        .notification-text h4 {
            margin: 0 0 0.5rem 0;
            color: var(--text-dark);
            font-size: 1rem;
        }
        
        .notification-text p {
            margin: 0;
            color: var(--text-medium);
            font-size: 0.9rem;
        }
        
        .success-notification {
            background: #d4edda;
            border-color: #c3e6cb;
        }
        
        .success-notification .notification-text h4 {
            color: #155724;
        }
        
        .success-notification .notification-text p {
            color: #155724;
        }
        
        @media (max-width: 768px) {
            .download-notification,
            .success-notification {
                top: 10px;
                right: 10px;
                left: 10px;
                transform: translateY(-100px);
            }
            
            .download-notification.show,
            .success-notification.show {
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', function() {
    addNotificationStyles();
});
