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

  // Start the marquee animation on page load
  startMarquee();
});

  $(document).ready(function() {
    $(".marquee-container").hover(
      function() {
        $(".marquee").addClass("paused");
      },
      function() {
        $(".marquee").removeClass("paused");
      }
    );
  });
