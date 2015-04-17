// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function trackSearch(event) {
	event.preventDefault();
	var searchTerm= $('.js-searchbar').val();
 	var trackUrl= 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm 
 	var trackGet= $.get(trackUrl);

 function handleTrack (response){
 	var trackResponse=response.tracks.items[0]
 	$('.js-title').append(trackResponse.name)
 	$('.js-author').append('<button data-id="' + trackResponse.artists[0].id + '" class="js-artist-button">' + trackResponse.artists[0].name + '</button>')
 	$('.js-player').prop('src',trackResponse.preview_url)
 	$('.albumArt').prop('src',trackResponse.album.images[0].url)	
	$('.js-artist-button').on('click', artistInfoSearch )
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
  $('.progBar').prop('value', current)
}

 function artistInfoSearch (event){	
 	var artistId= $(event.target).data('id')
 	var artistInfoUrl=	"https://api.spotify.com/v1/artists/" + artistId
 	var artistRequest= $.get(artistInfoUrl)
 	

 function handleArtist (response){
 	console.log(response)
 	$('.js-modal-head').text(response.name)
 	$('.js-modal-genre').text(response.genres[0]) 
 	$('.js-modal-followers').text(response.followers.total + ' followers')
 	$('.js-modal-image').append('<img src="' + response.images[2].url + '">') 

 	$('.js-modal').modal();
 	// $('.js-modal').append(artistInfoResponse.genre)
 	// name (genre, photo, followers)
 }

 	artistRequest.done(handleArtist)
 }

$('.js-player').on('timeupdate', printTime);
$('.js-search-button').on('click', trackSearch);
$('.btn-play').on('click', playAudio)
$('.js-player').on('timeupdate', printTime);


