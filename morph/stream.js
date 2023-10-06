 var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'b1ecN3rOoFQ', // replace with your video id
      events: {
        'onReady': onPlayerReady,
      }
    });
  }

  function onPlayerReady(event) {
    event.target.pauseVideo();
  }

  $(document).ready(function() {
    let animationInterval;

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
        player.playVideo();
      },
      function() {
        $(".marquee").removeClass("paused");
        player.pauseVideo();
      }
    );
  });

