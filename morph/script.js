$(document).ready(function() {
    let animationTimeout;

    // Function to start the marquee animation
    function startMarquee() {
        clearTimeout(animationTimeout);
        $(".marquee").animate({ right: "100%" }, 10000, "linear", function() {
            // Animation complete, reset position and restart
            $(this).css("right", "-100%");
            animationTimeout = setTimeout(startMarquee, 1000); // Pause for 1 second before restarting
        });
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


