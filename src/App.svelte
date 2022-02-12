<script>
  export let apiUrl;
  import {
    MaterialApp,
    ProgressCircular,
    Card,
    CardActions,
    Button,
    Icon,
    Footer,
    Divider,
  } from "svelte-materialify";
  import { mdiCart } from "@mdi/js";

  let theme = "light";
  const fetchMovies = (async () => {
    const response = await fetch(apiUrl);
    return await response.json();
  })();
</script>

<MaterialApp {theme}>
  {#await fetchMovies}
    <div class="d-flex flex-column align-center align-content-center">
      <h2>Oi mate, let's find you some cheap movie tickets!</h2>
      <ProgressCircular size={40} indeterminate color="primary" />
    </div>
  {:then data}
    <div class="d-flex flex-column align-center align-content-center">
      <h2>Here are your cheapest tickets. Enjoy!</h2>
    </div>
    <Divider />
    <div class="d-flex flex-wrap justify-center mt-4">
      {#each data.movies as movie}
        <Card style="max-width:500px" class="pa-4 ma-4">
          <div class=" text-center">
            <img
              src={movie.poster}
              alt="PosterImage"
              onerror="this.src='https://via.placeholder.com/300x450?text=No+poster'"
            />
            <h4>{movie.title}</h4>
            <p style="color:gray;">
              {movie.year} | {movie.country} | {movie.rated}
            </p>
          </div>
          <ul class="pa-2">
            <li><b>Director</b>: {movie.director}</li>
            <li><b>Main Cast</b>: {movie.actors}</li>
            <li><b>Genre</b>: {movie.genre}</li>
            <li><b>Running Time</b>: {movie.runtime}</li>
            <li><b>Release Date</b>: {movie.released}</li>
            <li><b>Language</b>: {movie.language}</li>
            <li><b>Rating</b>: {movie.rating}</li>
            <li><b>Metascore</b>: {movie.metascore}</li>
          </ul>
          <CardActions class="justify-center mt-6">
            <Button outlined class="primary-text ">
              <Icon path={mdiCart} class="mr-3" />
              Purchase ticket for ${movie.price}</Button
            >
          </CardActions>
        </Card>
      {/each}
    </div>
  {:catch error}
    <div class="d-flex flex-column align-center align-content-center">
      <h2>AN ERROR OCCURED 😢</h2>
      <h2>PLEASE RELOAD THE PAGE</h2>
    </div>
  {/await}

  <div style="height: 200px;position:relative;">
    <Footer padless class="justify-center flex-column" absolute>
      <p class="pa-2">
        Created by <a href="https://github.com/eubelov">Evgeny Belov</a>
      </p>
    </Footer>
  </div>
</MaterialApp>

<style>
  img {
    width: 300px;
    height: 450px;
  }

  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 300;
  }

  h4 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
</style>
