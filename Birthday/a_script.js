var slidesshow = document.getElementById("slideshow");
var images = [];
var tempSlide;
var totalWidth = 0;
var last = slides.length-1;
var j = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var why = document.getElementById("this-is-annoying");
var s = 0;
var img = document.getElementById("firstImg");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
if (window.innerHeight/window.innerWidth> 1.35){
  document.getElementById("top-line").style.height = "300px";
  img.style.height = "280px";
  c1.style.top = "300px";
  c2.style.top = "300px";
}
img.style.left = "calc(50vw - " + (img.getBoundingClientRect().width)/2 + "px)";
c1.style.left = "calc(" + img.getBoundingClientRect().left + "px - 5%)";
c2.style.left = "calc(" + img.getBoundingClientRect().right + "px - 5%)";

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

changeSlide = function(){
  var max =0;
  for (var i = 0; i<s; i++){
    if (images[i].getBoundingClientRect().right > max){
      max = images[i].getBoundingClientRect().right;
    }
    if (i == slides.length-1){
      totalWidth = max-4;
    }
    var tempLeft = images[i].getBoundingClientRect().left;
    if (s == slides.length){
      tempLeft-=1.5;
    }
    if (tempLeft <= -images[i].getBoundingClientRect().width){
      tempLeft = totalWidth;
      last += 1;
    }
    images[i].style.left = "calc(" + tempLeft.toString() + "px - 5vw)";
  }
  window.requestAnimationFrame(changeSlide);
}
  slides = shuffle(slides);
for (var i = 0; i<slides.length; i++){

  const tempSlide = new Image();
  tempSlide.className = "slideshow-img";
  slideshow.appendChild(tempSlide);
  tempSlide.onload = function(){
    this.style.display = "block";
    s++;
    this.style.left = "calc(2% + " + totalWidth + "px)";
    totalWidth = this.getBoundingClientRect().right - 0.07*window.innerWidth  - 2;
    if (s==slides.length-1){
      changeSlide();
    }
  }
  tempSlide.src = slides[i];
  images.push(tempSlide);
}
