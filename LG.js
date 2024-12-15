document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1 };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Back to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 300){
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Toggle code snippet
    const toggleCodeBtn = document.querySelector('.toggle-code');
    const codeBlock = document.querySelector('.code-block');
    if (toggleCodeBtn && codeBlock) {
        toggleCodeBtn.addEventListener('click', () => {
            if (codeBlock.style.display === 'none' || codeBlock.style.display === '') {
                codeBlock.style.display = 'block';
                toggleCodeBtn.textContent = 'Hide Code';
            } else {
                codeBlock.style.display = 'none';
                toggleCodeBtn.textContent = 'Show Code';
            }
        });
    }

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
});
