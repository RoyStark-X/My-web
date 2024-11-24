
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
