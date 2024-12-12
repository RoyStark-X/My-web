document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById("UAVvideo-1");
    if (video) {
        video.muted = true;
        video.loop = true;

        var image = document.getElementById("UAVimage-1");

        video.addEventListener("ended", function() {
            video.style.display = "none";
            image.style.display = "block";
        });

        // 节流函数
        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        // 滚动处理函数
        const handleScroll = throttle(function() {
            const startScroll = 0;
            const endScroll = 300;
            const maxScale = 1;
            const minScale = 0.9;
            const maxRadius = 40;

            let scrollProgress = (window.scrollY - startScroll) / (endScroll - startScroll);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));
            
            const scale = maxScale - (scrollProgress * (maxScale - minScale));
            const borderRadius = scrollProgress * maxRadius;
            
            video.style.transform = `scale(${scale})`;
            video.style.borderRadius = `${borderRadius}px`;
        }, 5); // 约60fps的执行频率

        window.addEventListener('scroll', handleScroll);
    }
});

function checkResolution(){
    var image = document.getElementById("iphone14pro");
    if (window.innerWidth < 800){
        image.src = "images/iphone14pro-s1.png";   
    }
    else{
        image.src = "images/iphone14pro.png"; 
    }
}
window.onload = checkResolution;
window.onresize = checkResolution;