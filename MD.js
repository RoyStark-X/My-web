document.addEventListener('DOMContentLoaded', () => {
    // Fade-in on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Lightbox logic (Optional)
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img, .gallery-item .video-overlay').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const src = item.getAttribute('data-src');
            openLightbox(type, src);
        });
    });

    function openLightbox(type, src) {
        // Clear previous content
        while(lightboxContent.firstChild) {
            lightboxContent.removeChild(lightboxContent.firstChild);
        }

        // Create new content based on type
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = "Enlarged Image";
            lightboxContent.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            lightboxContent.appendChild(video);
        }

        // Display the lightbox
        lightbox.style.display = 'flex';
    }

    // Close lightbox on close button or outside click
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        // Clear content
        while(lightboxContent.firstChild) {
            lightboxContent.removeChild(lightboxContent.firstChild);
        }
    }

    // CAD Gallery
    const images = [
        'Assembly_View.png',
        'Bottom_Disc.png',
        'Drug_Box.png',
        'Drug_Funnel.png',
        'Drug_Storage_Module.png',
        'Drug_Tray.png',
        'Drug_Tray_Base.png',
        'Isometric_View.png',
        'Large_Winding_Wheel.png',
        'Linear_Guide.png',
        'Linear_Guide_Block.png',
        'Mobile_Chassis_Module.png',
        'Sliding_Slot.png',
        'Steering_U_Frame.png',
        'Telescopic_Pushrod.png',
        'Transfer_Rod.png'
    ];

    let currentImageIndex = 0;
    const carouselImage = document.querySelector('.carousel-image');
    const pdfLink = document.querySelector('.pdf-download');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    // Create dots
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showImage(index));
        dotsContainer.appendChild(dot);
    });

    function showImage(index) {
        currentImageIndex = index;
        const imageName = images[index];
        carouselImage.src = `images/MD/Converted_Images/${imageName}`;
        carouselImage.alt = imageName.replace('.png', '');
        pdfLink.href = `images/MD/Converted_Images/PDF2/${imageName.replace('.png', '.pdf')}`;
        pdfLink.textContent = 'View PDF'; // 更改按钮文本
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Initialize first image
    showImage(0);

    // Add button listeners
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });
});
