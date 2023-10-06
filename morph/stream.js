
$(document).ready(function() {
  let animationInterval;
  let audioElement = new Audio('http://wbgo.streamguys.net/thejazzstream');

  function startMarquee() {
    $(".marquee").animate({ left: "-100%" }, 60000, "linear", function() {
      $(this).css("left", "100%");
      if (!$(this).hasClass("paused")) {
        startMarquee();
      }
    });
  }

  // Start the marquee animation on page load
  startMarquee();

  $(".marquee-container").hover(
    function() {
      $(".marquee").addClass("paused");
      audioElement.play();
    },
    function() {
      $(".marquee").removeClass("paused");
      audioElement.pause();
    }
  );
});
