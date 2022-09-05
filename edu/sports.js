$(document).ready(function(){

//variables for the rings
  var blueRing = $('#js_blueRing');
  var blueRingAlt = $('#js_blueRingAlt');

  var yellowRing = $('#js_yellowRing');
  var yellowRingAlt = $('#js_yellowRingAlt');

  var blackRing = $('#js_blackRing');

  var greenRing = $('#js_greenRing');
  var greenRingAlt = $('#js_greenRingAlt');

  var redRing = $('#js_redRing');
  var redRingAlt = $('#js_redRingAlt');

function runit(){
  //create a new timeline
 var tl = new TimelineLite();
//animate
  tl
    .from(blueRing, 2, {y:-400, opacity:0, ease: Power4.easeIn}) 
    .add('ringyellow')
    .to(blueRing, 0.667, {transformOrigin: "50% 100%", scaleY:0.5, yoyo:true, repeat:1})
    .add('ringblack')
    .add('ringgreen')
    .add('ringred')
    .to(blueRing, 1.667, {y:-200, ease:Circ.easeOut, yoyo:true, repeat:1})
    .to(blueRing, 1, {transformOrigin: "50% 100%", scaleY:0.75, yoyo:true, repeat:1})

    //show the overlapping part of the blue ring
    .to(blueRingAlt, 0.6, {opacity:1})

    //yellow ring
    .from(yellowRing, 2, {y:-400, opacity:0, ease: Power4.easeIn}, 'ringyellow')
    .to(yellowRing, 0.667, {transformOrigin: "50% 100%", scaleY:0.5, yoyo:true, repeat:1}, 'ringyellow+=2')
    .to(yellowRing, 1.667, {y:-200, ease:Circ.easeOut, yoyo:true, repeat:1}, 'ringyellow+=3.334')
    .to(yellowRing, 1, {transformOrigin: "50% 100%", scaleY:0.75, yoyo:true, repeat:1}, 'ringyellow+=6.668')
    .to(yellowRingAlt, 0.6, {opacity:1}, 'ringyellow+=8.668')

    //black ring
    .from(blackRing, 2, {y:-400, opacity:0, ease: Power4.easeIn}, 'ringblack')
    .to(blackRing, 0.667, {transformOrigin: "50% 100%", scaleY:0.5, yoyo:true, repeat:1}, 'ringblack+=2')
    .to(blackRing, 1.667, {y:-200, ease:Circ.easeOut, yoyo:true, repeat:1}, 'ringblack+=3.334')
    .to(blackRing, 1, {transformOrigin: "50% 100%", scaleY:0.75, yoyo:true, repeat:1}, 'ringblack+=6.668')

    //green ring
    .from(greenRing, 2, {y:-400, opacity:0, ease: Power4.easeIn}, 'ringgreen+=0.667')
    .to(greenRing, 0.667, {transformOrigin: "50% 100%", scaleY:0.5, yoyo:true, repeat:1}, 'ringgreen+=2.667')
    .to(greenRing, 1.667, {y:-200, ease:Circ.easeOut, yoyo:true, repeat:1}, 'ringgreen+=4.001')
    .to(greenRing, 1, {transformOrigin: "50% 100%", scaleY:0.75, yoyo:true, repeat:1}, 'ringgreen+=7.335')
    .to(greenRingAlt, 0.6, {opacity:1}, 'ringgreen+=9.335')   

    //red ring
    .from(redRing, 2, {y:-400, opacity:0, ease: Power4.easeIn}, 'ringred+=1.334') 
    .to(redRing, 0.667, {transformOrigin: "50% 100%", scaleY:0.5, yoyo:true, repeat:1}, 'ringred+=3.334')
    .to(redRing, 1.667, {y:-200, ease:Circ.easeOut, yoyo:true, repeat:1}, 'ringred+=4.668')
    .to(redRing, 1, {transformOrigin: "50% 100%", scaleY:0.75, yoyo:true, repeat:1}, 'ringred+=8.002')
    .to(redRingAlt, 0.6, {opacity:1}, 'ringred+=10.002') 

  .timeScale(4);
  return tl;
  }
  
  var runAnimation = runit();

  $( "#btn-replay" ).click(function() {
    runAnimation.restart();
});

  $("#btn-replay").mouseup(function(){
    $(this).blur();
});
});




