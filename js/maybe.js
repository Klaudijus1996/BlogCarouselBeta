let slider = document.querySelector('.slider');
let wrapper = document.querySelector('.wrapper');
let slidesDiv = document.querySelector('.slides');
let singleSlide = document.querySelector('.slide');
let posInitial;
let posFinal;


    setInterval(function(){frame(1);}, 1500);
    
    // setInterval(frame, 2);


 
    var pos = 0;
    // var id = setInterval(frame, 2);
    function frame() {
      if (pos == 1200) {
        pos = -370;  
        singleSlide.style.left = pos + "px";
      } else {
        pos = 300
        singleSlide.style.left = pos + "px";
        pos++; 
      }
    }
  







//   function shiftSlide(dir, action) {
//     slidesDiv.classList.add('shifting');
    
//     if (allowShift) {
//       if (!action) { posInitial = slidesDiv.offsetLeft; }

//       if (dir == 1) {
//         slidesDiv.style.left = (posInitial - slideSize - 15 ) + "px";
//         index++;
//       } else if (dir == -1) {
//         slidesDiv.style.left = (posInitial + slideSize + 15) + "px";
//         index--;      
//       }
//     };
//     allowShift = false;
//     checkIndex ();
//   }
    
//   function checkIndex (){
//     items.classList.remove('shifting');
   
//     if (index == -1) {
//       items.style.left = -(slidesLength * (slideSize-1)) + "px";
//       index = slidesLength-1;
//     }

//     if (index == slidesLength) {
//       items.style.left = -(0 * slideSize/slideSize) + "px";
//       index = 0;
//     }
    
//     allowShift = true;
//   }

