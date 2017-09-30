// when everything is loaded
function handleAPILoaded(){
  document.querySelector('#s').removeAttribute('disabled')
}

// search action
function search() {
  var q = $('#s').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type: "video"
  });

  request.execute(function(response) {
    resetPlayer();
    
    var resultsItems = response.result.items.length;
    
    // clean the results before a new search
    $('#search-results-container').html('');
    
    for(var i=0;i<resultsItems;i++){
      var itemHTML = generateThumbnail(response.result.items[i]);
      $('#search-results-container').append(itemHTML);
    }
    //
    // console.log(response.result);
  });
}


//listener to the enter key
document.querySelector('#s').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      search();
    }
});



// generates the HTML code for the thumbnails of the results
function generateThumbnail (item){
  var html = '';
  
  html += '<div class="media">';
  html += '  <div class="media-left">';
  html += '    <a href="https://www.youtube.com/watch?v='+ item.id.videoId + '" onclick="playVideoWithId(\''+ item.id.videoId + '\');">';
  html += '      <img class="media-object" src="'+ item.snippet.thumbnails.default.url + '">';
  html += '    </a>';
  html += '  </div>';
  html += '  <div class="media-body">';
  html += '    <h5 class="media-heading"><strong><a href="https://www.youtube.com/watch?v='+ item.id.videoId + '" onclick="playVideoWithId(\''+ item.id.videoId + '\');">'+ item.snippet.title + '</a></strong></h5>';
  html += '  </div>';
  html += '</div>';
  
  return html;
}


// play a video using its ID
function playVideoWithId(id){
  event.preventDefault();
  document.querySelector('#player').classList.remove('hidden');
  document.querySelector('.video-controls').classList.remove('hidden');
  player.loadVideoById(id, 5, "large");
  playVideo();
}


// player functions
function playVideo() {
  player.playVideo();
  
  document.querySelector('.play-button').classList.add('hidden');
  document.querySelector('.pause-button').classList.remove('hidden');
}
function pauseVideo() {
  player.pauseVideo();
  
  document.querySelector('.play-button').classList.remove('hidden');
  document.querySelector('.pause-button').classList.add('hidden');
}
function stopVideo() {
  player.stopVideo();
  
  document.querySelector('.play-button').classList.remove('hidden');
  document.querySelector('.pause-button').classList.add('hidden');
}
function resetPlayer(){
  stopVideo();
  document.querySelector('#player').classList.add('hidden');
  document.querySelector('.video-controls').classList.add('hidden');
}