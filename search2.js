// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

function ytplayer(event){
  var newVideoId = event.target.getAttribute('vid');
//  alert(event.target.getAttribute('vid'));
  player.loadVideoById(newVideoId);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type: 'video'
  });

  request.execute(function(response) {
    var results = response.result.items;
    console.log(response.result.items);
    var resultBox = document.getElementById("search-container");
    var listHTML = document.getElementById("list");
    listHTML.innerHTML = "";
    for(var i=0; i<results.length ; i++){
      listHTML.innerHTML += '<li><img class="myVideos" vid="'+results[i].id.videoId+'" src="'+ results[i].snippet.thumbnails.default.url +'?enablejsapi=1"><span>' + results[i].snippet.title + '</span></li><hr>';
    }
    var myVids = document.getElementsByClassName("myVideos");
    for(var j=0; j<myVids.length; j++){
      myVids[j].addEventListener('click', ytplayer);
    }
  });
}

//******YOUTUBE IFRAME PLAYER API******

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '195',
          width: '320',
          videoId: 'M7lc1UVf-VE', // placeholder video
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      //**MODIFIED - now sets up the play and pause buttons instead of autoplaying
      
      function onPlayerReady(event) {
        // event.target.playVideo();
          // bind events
        var playButton = document.getElementById("play-button");
        playButton.style.display = "block";
        playButton.addEventListener("click", function() {
          player.playVideo();
        });
        
        var pauseButton = document.getElementById("pause-button");
        pauseButton.style.display = "block";
        pauseButton.addEventListener("click", function() {
          player.pauseVideo();
        });

      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
//        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }