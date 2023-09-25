$(document).ready(function() {
    let animationTimeout;

    // Function to start the marquee animation
    function startMarquee() {
        animationTimeout = setTimeout(function() {
            $(".marquee").css("left", "-100%");
            $(".marquee").animate({ left: "100%" }, 10000, "linear", function() {
                // Animation complete, reset position and restart
                startMarquee();
            });
        }, 1000); // Pause for 1 second before restarting
    }

    // Start the marquee animation on page load
    startMarquee();

    // Pause the marquee on hover
    $(".marquee-container").hover(function() {
        $(".marquee").stop();
        clearTimeout(animationTimeout);
    }, function() {
        startMarquee();
    });
});




