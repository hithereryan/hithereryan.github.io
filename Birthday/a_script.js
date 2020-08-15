var slidesshow = document.getElementById("slideshow");
var images = [];
var tempSlide;
var totalWidth = 0;
var last = slides.length-1;
var j = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var why = document.getElementById("this-is-annoying");
var s = 0;

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
      totalWidth = max-7;
    }
    var tempLeft = images[i].getBoundingClientRect().left;
    console.log(s, slides.length);
    if (s == slides.length){
      tempLeft-=3;
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
  tempSlide.style.height = "20vw";
  slideshow.appendChild(tempSlide);
  tempSlide.style.display = "none";
  tempSlide.style.position = "absolute";
  tempSlide.onload = function(){
    this.style.display = "block";
    this.style.left = "calc(5vw + " + totalWidth + "px)";
    totalWidth = totalWidth + this.width-2;
    s++;
    if (s<=1){
      changeSlide();
    }
  }
  tempSlide.src = slides[i];
  images.push(tempSlide);
}
