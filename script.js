$('#Search-btn').on('click', function () {
  $('#movie-list').html('');

  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '42110fe6',
      's': $('#search_input').val()
    },
    success: function (result) {
      // console.log(result);
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $('#movie-list').append(` 
          <div class="col-md-6">
            <div class="card mb-6" style="width: 29rem; margin-bottom: 10px">
              <img src="`+ data.Poster + `" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`+ data.Title + `</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">`+ data.Year + `</li>
                <li class="list-group-item">`+ data.Type + `</li>
              </ul>
              <div class="card-body">
                <a href="#" class="btn btn-primary">Nonton Sekarang</a>
              </div>
            </div>
          </div>
          `);

        });
        $('#ket').html(`
        <h2 class="text-center">Total Results : `+ result.totalResults + `</h2>
        
        `);
        return;

      } else {
        $('#ket').html('<h2>Total Results : 0 </h2>');
        $('#movie-list').html('<h1 class="text-center">Movie Not Found</h1>');
      }
    }
  })

});

function top_rated() {
  $('#ket').html(`
		<h2 class="text-center">Top Rated</h5>
		<hr>
    `);

  $.ajax({
    url: "http://api.themoviedb.org/3/movie/top_rated?api_key=bb78e4cf3442e302d928f2c5edcdbee1",
    type: 'get',
    dataType: 'json',

    success: function (result) {
      let movies = result.results;
      console.log(movies);

      $.each(movies, function (i, data) {
        $('#movie-list').append(`
        <div class="col-md-6">
            <div class="card mb-6" style="width: 29rem; margin-bottom:8px">
              <img src="http://image.tmdb.org/t/p/w500`+ data.poster_path + `" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`+ data.original_title + `</h5>
                <p class="card-subtitle"> Bahasa : `+ data.original_language + `</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                <p>Overview</p>
                `+ data.overview + `
                </li>
                <li class="list-group-item">Popularity : `+ data.popularity + `</li>
                <li class="list-group-item">Release : `+ data.release_date + `</li>
              </ul>
            </div>
          </div>
				`);
      });
    }
  });
}

function upcoming() {
  $('#ket').html(`
		<h2 class="text-center">UPCOMING</h5>
		<hr>
    `);

  $.ajax({
    url: "http://api.themoviedb.org/3/movie/upcoming?api_key=bb78e4cf3442e302d928f2c5edcdbee1",
    type: 'get',
    dataType: 'json',

    success: function (result) {
      let movies = result.results;
      console.log(movies);

      $.each(movies, function (i, data) {
        $('#movie-list').append(`
        <div class="col-md-6">
            <div class="card mb-6" style="width: 29rem; margin-bottom:8px">
              <img src="http://image.tmdb.org/t/p/w500`+ data.poster_path + `" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`+ data.original_title + `</h5>
                <p class="card-subtitle"> Bahasa : `+ data.original_language + `</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                <p>Overview</p>
                `+ data.overview + `
                </li>
                <li class="list-group-item">Popularity : `+ data.popularity + `</li>
                <li class="list-group-item">Release : `+ data.release_date + `</li>
              </ul>
            </div>
          </div>
				`);
      });
    }
  });
}


// fungsi warna pada link nav
$('.nav-link').on('click', function () {
  $('.nav-link').removeClass('active');
  $(this).addClass('active');

  let kategori = $(this).html();

  if (kategori == "top rated") {
    $('#movie-list').html('');
    $('.hero').removeClass('hero');
    $('#ket').html('');
    top_rated();
  }

  if (kategori == "upcoming") {
    $('#movie-list').html('');
    $('.hero').removeClass('hero');
    $('#ket').html('');
    upcoming();
  }
});