//beggining of our application after oauth
function handleAPILoaded(){
    console.log("Ready.");
}

//search for videos
function search(){
    var element = document.querySelector('#query-input').value;
    var request = gapi.client.youtube.search.list({
        q: element,
        part: 'snippet',
        type: 'video'
      });
    
    //   request.execute(function(response){
    //     // alert(response.result.items[0].id.videoId);
    //     var results = response.result.items;
    //     console.log(results);
    //     for(var i=0; i<results.length ; i++){
    //         document.write('<p><iframe id="ytplayer" type="text/html" width="320" height="180" src="https://www.youtube.com/embed/'+ results[i].id.videoId +'" frameborder="0"></iframe></p>');
    //     }
    //   });
    
    request.execute(function(response) {
        var results = response.result.items;
        console.log(response.result.items);
        
        var resultBox = document.getElementById("search-container");
        var listHTML = document.getElementById("list");
        listHTML.innerHTML = "";
        var titlesHTML = document.getElementById("titles");
        titlesHTML.innerHTML = "";
        
        for(var i=0; i<results.length ; i++){
            listHTML.innerHTML += '<li><img class="myVideos" vid="'+results[i].id.videoId+'" src="'+ results[i].snippet.thumbnails.default.url +'?enablejsapi=1"><br>';
            titlesHTML.innerHTML += '<li><span>' + results[i].snippet.title + '</span></li><hr>';
        }
        
        var myVids = document.getElementsByClassName("myVideos");
        
        for(var j=0; j<myVids.length; j++){
            myVids[j].addEventListener('click', ytplayer);
        }
    });
}

function ytplayer(event){
    var newVideoId = event.target.getAttribute('vid');
    alert(event.target.getAttribute('vid'));
    // player.loadVideoById(newVideoId);
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        // playerVars: {'controls': 0 },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}