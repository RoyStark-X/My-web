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

    // Lightbox logic
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
        while(lightboxContent.firstChild) {
            lightboxContent.removeChild(lightboxContent.firstChild);
        }

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            lightboxContent.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            lightboxContent.appendChild(video);
        }

        lightbox.style.display = 'flex';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        while(lightboxContent.firstChild) {
            lightboxContent.removeChild(lightboxContent.firstChild);
        }
    }
});
