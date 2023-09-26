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

   $(".marquee-container").on('mouseenter', function() {
    $(".marquee").stop().addClass("paused");
}).on('mouseleave', function() {
    $(".marquee").removeClass("paused");
    startMarquee();
});

    <marquee onmouseover="this.stop();" onmouseout="this.start();">
  my text here
</marquee>

$(function() {
  var marquee = $('div.marquee');
  marquee.each(function() {
    var mar = $(this),
        indent = mar.width();
    mar.marquee = function() {
      indent--;
      mar.css('text-indent', indent);
      if (indent < -1 * mar.children('div.marquee-text').width()) {
        indent = mar.width();
      }
    };
    mar.data('interval', setInterval(mar.marquee, 1000 / 60));
    mar.hover(function() {
      clearInterval($(this).data("interval"));
    }, function() {
      $(this).data('interval', setInterval(mar.marquee, 1000 / 60));
    });
  });
});
    
    // Pause the marquee on hover
    $(".marquee-container").hover(function() {
        $(".marquee").stop().addClass("paused");
    }, function() {
        $(".marquee").removeClass("paused");
        startMarquee();
    });
});





