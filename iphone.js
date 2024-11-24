var video = document.getElementById("iphone14pro-v");
video.muted = true;

var video = document.getElementById("iphone14pro-v");
var image = document.getElementById("iphone14pro");


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



var video = document.getElementById("iphone14pro-v");
video.addEventListener("ended", function() {
  alert("The video has ended");
});
