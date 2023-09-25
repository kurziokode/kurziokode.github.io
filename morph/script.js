$(document).ready(function() {
    // Function to start the marquee animation
    function startMarquee() {
        $(".marquee").animate({ right: "100%" }, 10000, "linear", function() {
            // Animation complete, reset position and restart
            $(this).css("right", "-100%");
            startMarquee();
        });
    }

    // Start the marquee animation on page load
    startMarquee();

    // Pause the marquee on hover
    $(".marquee-container").hover(function() {
        $(".marquee").stop();
    }, function() {
        $(".marquee").css("right", "-100%");
        startMarquee();
    });
});

