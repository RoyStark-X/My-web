document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('detailModal');
    const modalClose = modal.querySelector('.modal-close');
    const modalSlider = modal.querySelector('.modal-slider');
    const dotsContainer = modal.querySelector('.dots-container');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const leftArrow = modal.querySelector('.left-arrow');
    const rightArrow = modal.querySelector('.right-arrow');
  
    let currentIndex = 0;
    let images = [];
  
    // 点击gallery item打开modal
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const imgData = JSON.parse(item.getAttribute('data-images') || '[]');
        const title = item.getAttribute('data-title') || '';
        const desc = item.getAttribute('data-description') || '';
  
        // 设置modal内容
        images = imgData;
        currentIndex = 0;
  
        modalTitle.textContent = title;
        modalDescription.textContent = desc;
  
        // 清空先前内容
        modalSlider.innerHTML = '';
        dotsContainer.innerHTML = '';
  
        // 插入图片或视频
        images.forEach((src, i) => {
          // 判断是否为视频文件
          const isVideo = src.toLowerCase().endsWith('.mp4') || 
                         src.toLowerCase().endsWith('.webm');
          
          if (isVideo) {
            const videoEl = document.createElement('video');
            videoEl.src = src;
            videoEl.controls = true;
            if (i === 0) videoEl.classList.add('active');
            modalSlider.appendChild(videoEl);
          } else {
            const imgEl = document.createElement('img');
            imgEl.src = src;
            if (i === 0) imgEl.classList.add('active');
            modalSlider.appendChild(imgEl);
          }
  
          // 小点指示器
          const dot = document.createElement('span');
          dot.classList.add('dot');
          if (i === 0) dot.classList.add('active');
          dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
          });
          dotsContainer.appendChild(dot);
        });
  
        // 添加这行
        updateSlider();

        modal.style.display = 'block';
      });
    });
  
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    });
  
    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    });
  
    // 修改updateSlider函数
    function updateSlider() {
      const allMedia = modalSlider.querySelectorAll('img, video');
      const allDots = dotsContainer.querySelectorAll('.dot');
      
      // 先重置所有媒体元素
      allMedia.forEach(media => {
        media.classList.remove('active');
        if(media.tagName === 'VIDEO') {
          media.pause();
        }
      });
      
      // 只显示当前索引的媒体元素
      const currentMedia = allMedia[currentIndex];
      if(currentMedia) {
        currentMedia.classList.add('active');
      }
      
      // 更新小点状态
      allDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  });