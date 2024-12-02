
var video = document.getElementById("UAVvideo-1");
video.muted = true;

var video = document.getElementById("UAVvideo-1");
var image = document.getElementById("UAVimage-1");


video.addEventListener("ended", function() {
  video.style.display = "none";
  image.style.display = "block";
});





function checkResolution(){
  var image = document.getElementById("iphone14pro");
  if (window.innerWidth<800){
    image.src = "images/iphone14pro-s1.png";   
  }
  else{
    image.src = "images/iphone14pro.png"; 
  }
}
    window.onload = checkResolution;
    window.onresize = checkResolution;
