$(document).ready(function() {
    let animationInterval;

    // Function to start the marquee animation
    function startMarquee() {
        animationInterval = setInterval(function() {
            $(".marquee").animate({ left: "100%" }, 10000, "linear", function() {
                // Animation complete, reset position
                $(this).css("left", "-100%");
            });
        }, 1000); // Restart every 1 second
    }

    // Start the marquee animation on page load
    startMarquee();

    // Pause the marquee on hover
    $(".marquee-container").hover(function() {
        clearInterval(animationInterval); // Pause the animation
    }, function() {
        startMarquee(); // Resume the animation
    });
});



