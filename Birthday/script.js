var slideshow = document.getElementById("img-slideshow");
var slides = ["file_526114.jpg"];
var slide = 0;
var frame = 0;

changeSlide = function(){
  slide = Math.floor(frame/120);
  if (frame == (slides.length*120-1)){
    frame = 0;
  }
  else{
    frame ++;
  }
  slideshow.src = slides[slide];
  window.requestAnimationFrame(changeSlide);
}

changeSlide();
