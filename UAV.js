/* filepath: /f:/Web/web/My-web/UAV.js */
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    // 更新选择器以包含.d4-image
    const images = document.querySelectorAll('.d2-images img, .d3-image');
    const closeBtn = document.querySelector('.close');
  
    images.forEach(img => {
      img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
      }
    });
  
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
  
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    }

    showSlides(1); // 页面加载完成后显示第一张
});

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}