

/*
var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '180',
      width: '320',
      videoId: 'BLF-f4kUtAw', // replace with your video id
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
*/

var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'rAO8HZB3a-4', // replace with your video id
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo(); // Play the video when it's ready
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
      player.pauseVideo(); // Pause the video when the marquee is hovered over
    },
    function() {
      $(".marquee").removeClass("paused");
      player.playVideo(); // Resume the video when the marquee is not being hovered over
      if (!$(".marquee").hasClass("paused")) {
        startMarquee(); // Resume the marquee animation if it was paused
      }
    }
  );
});

  


  

