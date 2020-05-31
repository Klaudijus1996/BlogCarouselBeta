'use strict';

var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
    /** CLONING **/
    function cloneToBack() {
      let slides = sliderItems.querySelectorAll('.slide'),
      firstSlide = slides[0],
      secondSlide = slides[1],
      thirdSlide = slides[2],
      cloneFirst = firstSlide.cloneNode(true),
      cloneSecond = secondSlide.cloneNode(true),
      cloneThird = thirdSlide.cloneNode(true);
  
      document.querySelector(".slides").appendChild(cloneFirst);
      document.querySelector(".slides").appendChild(cloneSecond);
      document.querySelector(".slides").appendChild(cloneThird);
    } 
    cloneToBack()
    // /** INSERT.BEFORE **/

    function cloneToFront() {
      let slides = sliderItems.querySelectorAll('.slide'),
      beforeSlide1 = slides[3],
      beforeSlide2 = slides[2],
      beforeSlide3 = slides[1],
      beforeSlide4 = slides[0],

      clonedSlide1 = beforeSlide1.cloneNode(true),
      clonedSlide2 = beforeSlide2.cloneNode(true),
      clonedSlide3 = beforeSlide3.cloneNode(true),
      clonedSlide4 = beforeSlide4.cloneNode(true);
      
      document.querySelector('.slides').insertBefore(clonedSlide3, slides[0]);
      document.querySelector('.slides').insertBefore(clonedSlide2, slides[0]);
      document.querySelector('.slides').insertBefore(clonedSlide1, slides[0]);
      // document.querySelector('.slides').insertBefore(clonedSlide3, slides[0]);
      // document.querySelector('.slides').insertBefore(clonedSlide2, slides[0]);
      // document.querySelector('.slides').insertBefore(clonedSlide1, slides[0]);
      // document.querySelector('.slides').insertBefore(beforeSlide1.cloneNode(true), slides[0]);
      // document.querySelector('.slides').insertBefore(beforeSlide1.cloneNode(true), slides[0]);
      // document.querySelector('.slides').insertBefore(beforeSlide1.cloneNode(true), slides[0]);
      // document.querySelector('.slides').insertBefore(beforeSlide1.cloneNode(true), slides[0]);
      // document.querySelector('.slides').insertBefore(beforeSlide1.cloneNode(true), slides[0]);
    }
    cloneToFront()


function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 30,
      slides = items.querySelectorAll('.slide'),
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      slideMargin = parseInt(window.getComputedStyle(document.querySelectorAll('.slide')[0]).getPropertyValue('margin-right').replace('px', '')),
      slideSizeWithMargin = slideSize + slideMargin,
      slidesInWrapper = (document.querySelectorAll('.wrapper')[0].offsetWidth / slideSizeWithMargin),
      slidesLength = slides.length,
      originalSlidesLength = blogData.length,
      index = 0,
      allowShift = true,
      dragActivated = false;

  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function ()  { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });

  
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
 
  enableSlidesTransition();
  
  /*************/
  let initSlides = setInterval(function() { shiftSlide(1); }, 1500);
  $('#slides').mouseover(function() {
    clearInterval(initSlides);
  }).mouseout(function(){
    if (!dragActivated) {
      initSlides = setInterval(function(){shiftSlide(1);}, 1500);
    }
  });

  
  function dragStart (e) {
    dragActivated = true;
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    if (e) {
      disableSlidesTransition();
    }
    if (e.type == 'touchstart') {
      items.style.transition = 'none';
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
      items.style.transition = 'none'; 
    }
  }
  
  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    const nuoKairiausiosSkaidresNutolesNulinisPer = slidesInWrapper * slideSizeWithMargin;
    const pozicija = parseInt((''+items.style.left).replace('px',''));
    const pozicijaNulinioAtzvilgiu = pozicija+nuoKairiausiosSkaidresNutolesNulinisPer;
    // console.log(`DRAG END ${items.style.left} ()`);
    // console.log(`Pozicija nulio atzvilgiu ${pozicijaNulinioAtzvilgiu} px`);
    let pastumimasSkaidriuKiekio = Math.ceil(pozicijaNulinioAtzvilgiu / slideSizeWithMargin);
    // if (pastumimasSkaidriuKiekio > 0) {
    //   console.log('pastumiau per ' + pastumimasSkaidriuKiekio + ' skaidres desinen');
    // } else {
    //   console.log('pastumiau per ' + -pastumimasSkaidriuKiekio + ' skaidres kairen');
    // }
    posFinal = items.offsetLeft;
    // I kaire gaunas pliusinis skaicius, i desine - minusinis
    const posDifference = posFinal - posInitial;
    const draggedToRightOverThreshold = posDifference < -threshold;
    const draggedToLeftOverThreshold = posDifference > threshold;
    if (draggedToRightOverThreshold || draggedToLeftOverThreshold) {
      enableSlidesTransition();
      const shiftCount = draggedToRightOverThreshold ? 1 : -1;
      // console.log('Kviecia shift slide');
      let kekw = Math.floor(Math.abs(pozicija / slideSizeWithMargin));
      // const paklaida = Math.abs(pozicija) - (kekw * slideSizeWithMargin);
      const lol = (posInitial > pozicija) ? 1 : ((posInitial < pozicija) ? -1 : 0);
      // const ezclap = kekw + lol;
      if (posInitial > pozicija) kekw++;
      const belekoksZvengas = - (kekw * slideSizeWithMargin);
      items.style.left = belekoksZvengas + "px";
      const veiks = Math.ceil((posInitial - belekoksZvengas) / slideSizeWithMargin)-1;
      console.log(lol);
      console.log(veiks);
      // console.log(belekoksZvengas);
      //index += lol;
      index += veiks;
      //index += pastumimasSkaidriuKiekio;

      //shiftSlide(shiftCount, 'drag');
    }
    document.onmouseup = null;
    document.onmousemove = null;
    dragActivated = false;
  }

  function shiftSlide(shiftPositionAndCount, action, noscroll) {  
    // console.log('<<function shiftSlide>>');
    console.log(`index = ${index}`);
    console.log(`item offset = ${items.offsetLeft} (${items.offsetLeft/slideSizeWithMargin} * ${slideSizeWithMargin})`);
    // Pliusiniai skaiciai - stumt i desine, minusiniai - i kaire. Nulis - niekur nestumt
    const direction = Math.sign(shiftPositionAndCount);
    SlideToOppositeEdgeIfNeeded(index, direction);
    const howMany = Math.abs(shiftPositionAndCount);
    if (allowShift) {
      if (!action) { 
        posInitial = items.offsetLeft;
      }
      // console.log(`PosInitial nusistate ${posInitial}`);
      // console.log(`Shiftina nuo ${items.style.left}`);
      Shift(direction, posInitial, howMany, noscroll);
      // console.log(`Iki ${items.style.left}`);
      index += howMany * direction;
    };
    allowShift = false;
    checkIndex ();
    //SlideToOppositeEdgeIfNeeded(index, direction);
    // console.log('<< END OF function shiftSlide>>');
  }

  // kai noscroll = true - pisa teleporta
  function Shift(dir, posInitial, howMany, noscroll) {
    // console.log('<<Funkcija shift>>');
    // console.log(`overallSizeToShift = slideSizeWithMargin(${slideSizeWithMargin}) * howMany(${howMany}) * dir(${dir})`)
    const overallSizeToShift = slideSizeWithMargin * howMany * dir;
    // console.log(`overallSizeToShift = ${overallSizeToShift}`);
    if (noscroll) disableSlidesTransition();
    items.style.left = (posInitial - overallSizeToShift ) + "px";
    items.offsetHeight; // Hack for transition disable to work properly (force to flush css)
    if (noscroll) enableSlidesTransition();
    // console.log('<<End of Funkcija shift>>');
  }

  function checkIndex (){
    //items.classList.remove('shifting');
   
    if (index < 0) {
      items.style.left = -(slidesLength * slideSizeWithMargin) + "px";
      index = slidesLength-1;
    }

    if (index >= slidesLength) {
      items.style.left = -(1 * slideSizeWithMargin) + "px";
      index = 0;
    }
    
    allowShift = true;
  }

  // Cia pisa teleporta nematoma
  function SlideToOppositeEdgeIfNeeded(index, direction) {
    // console.log('<<Funkcija SlideToOppositeEdgeIfNeeded>>');
    // console.log(`SlideToOppositeEdgeIfNeeded: index=${index}, direction=${direction}`);
    // Jei nuvaziavo per daug i desine ir jau reik perstumt i kaire
    if ((index > 3) && (direction > 0)) {
      shiftSlide(-originalSlidesLength, undefined, true);
    // Jei nuvaziavo per daug i kaire ir jau reik perstumt i desine
    } else if ((index <= -3) && (direction < 0)) {
      shiftSlide(originalSlidesLength, undefined, true);
    }
    // console.log('<<End of Funkcija SlideToOppositeEdgeIfNeeded>>');
  }

  function disableSlidesTransition() {
    items.style.transition = "none";
  }

  function enableSlidesTransition() {
    items.style.transition = "1s";
  }
}

slide(slider, sliderItems, prev, next);