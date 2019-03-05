var topics = ['Scarface', 'Juice'];

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

  $.ajax({
    url: "https://api.giphy.com",
    method: "GET",
    data: {
      path: 'v1/gifs/search',
      api_key: config.key,
      q: movie,
      limit: 10,
      rating: 'pg'
    }
  }).then(function(response) {

  })

  addMovieButton();
})

addMovieButton();