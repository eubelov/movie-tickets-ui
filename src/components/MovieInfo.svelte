<script>
  export let movie;
</script>

<ul class="pa-2 film-info">
  <li><b>Director</b>: {movie.director}</li>
  <li><b>Main Cast</b>: {movie.actors}</li>
  <li><b>Genre</b>: {movie.genre}</li>
  <li><b>Running Time</b>: {movie.runtime}</li>
  <li><b>Release Date</b>: {movie.released}</li>
  <li><b>Language</b>: {movie.language}</li>
  <li><b>Metascore</b>: {movie.metascore}</li>
</ul>

<style>
  ul.film-info {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
</style>
