$(document).ready(function() {
    let animationInterval;
    
    // Function to start the marquee animation
    function startMarquee() {
        $(".marquee").animate({ left: "-100%" }, 30000, "linear", function() {
            // Animation complete, reset position and restart
            $(this).css("left", "100%");
            if (!$(this).hasClass("paused")) {
                startMarquee();
            }
        });
    }

    // Start the marquee animation on page load
    startMarquee();

$('.marquee_text').marquee({
  pauseOnHover: true
});
    
    // Pause the marquee on hover
    $(".marquee-container").hover(function() {
        $(".marquee").stop().addClass("paused");
    }, function() {
        $(".marquee").removeClass("paused");
        startMarquee();
    });
});





