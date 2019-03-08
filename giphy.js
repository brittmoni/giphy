var topics = [];

function addMovieButton() {
  $('#movie-buttons').empty();

  for (var i = 0; i < topics.length; i++) {
    var movieBtn = $('<button>');
    movieBtn.addClass('btn btn-secondary new-movie')
      .attr('data-name', topics[i])
      .text(topics[i]);
    
      $('#movie-buttons').append(movieBtn);
  }
}

$('#enter').on('click', function(event) {
  event.preventDefault();

  var movie = $('#new-movie').val().trim();
  topics.push(movie);


  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + movie + '&api_key=' +
    config.key + "&limit=10";

    console.log(movie, queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .then(function(response) {
    for(var i = 0; i <= 9; i++){
      var gif = response.data[i].images.fixed_height_still.url;
      console.log(gif);

      var movieGif = $('<img>');

      movieGif.attr('src', gif);
      movieGif.attr('data-still', response.data[i].images.fixed_height_still.url);
      movieGif.attr('data-animate', response.data[i].images.fixed_height.url);
      movieGif.attr('data-state', 'still');
      movieGif.attr('alt', 'movie gif');

      $('#gif-display').append(movieGif);

      movieGif.on('click', function() {
        var state = $(this).attr('data-state');
    
        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
        }
      });
    }
    addMovieButton();

  // movieGif.on('click', function() {
  //   var state = $(this).attr('data-state');

  //   if (state === 'still') {
  //     $(this).attr('src', $(this).attr('data-animate'));
  //     $(this).attr('data-state', 'animate');
  //   } else {
  //     $(this).attr('src', $(this).attr('data-still'));
  //     $(this).attr('data-state', 'still');
  //   }
  // });
  });

addMovieButton();
});
