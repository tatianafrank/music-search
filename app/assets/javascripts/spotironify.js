// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function trackSearch(event) {
	console.log('hello')
	event.preventDefault();
	var searchTerm= $('.js-searchbar').val();
 	var trackUrl= 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm 
 	var trackGet= $.get(trackUrl);

 function handleTrack (response){
 	console.log(response.tracks.items[0])
 	trackResponse=response.tracks.items[0]
 	$('.js-title').append(trackResponse.name)
 	$('.js-author').append(trackResponse.artists[0].name)
 	$('.js-player').prop('src',trackResponse.preview_url)
 	$('.albumArt').prop('src',trackResponse.album.images[0].url)	
 }


trackGet.done(handleTrack)
 }

function playAudio(){
	$('.btn-play').toggleClass('playing');
	if ($('.btn-play').hasClass('playing'))
		$('.js-player').trigger('play');
	else 
		$('.js-player').trigger('pause');

}

function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
  $('.progBar').prop('value', current)
}

// Have printTime be called when the time is updated
$('.js-player').on('timeupdate', printTime);

 $('.js-search-button').on('click', trackSearch);
 $('.btn-play').on('click', playAudio)
 $('.js-player').on('timeupdate', printTime);

