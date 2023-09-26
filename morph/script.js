//$(document).ready(function() {
   // let animationInterval;
    
    // Function to start the marquee animation
  //  function startMarquee() {
    //    $(".marquee").animate({ left: "-100%" }, 30000, "linear", function() {
            // Animation complete, reset position and restart
         //   $(this).css("left", "100%");
          //  if (!$(this).hasClass("paused")) {
           //     startMarquee();
       //     }
     //   });
 //   }

    // Start the marquee animation on page load
  //  startMarquee();

$(document).ready(function() {
  let animationInterval;

  function startMarquee() {
    $(".marquee").animate({ left: "-100%" }, 15000, "linear", function() {
      $(this).css("left", "100%");
      if (!$(this).hasClass("paused")) {
        startMarquee();
      }
    });
  }

  $(".marquee-container").hover(
    function() {
      $(".marquee").stop(true).addClass("paused");
    },
    function() {
      $(".marquee").removeClass("paused");
      startMarquee();
    }
  );

  // Start the marquee animation on page load
  startMarquee();
});
