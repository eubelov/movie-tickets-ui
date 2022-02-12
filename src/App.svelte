<script>
  export let apiUrl;
  export let githubLink;
  export let messages;

  import About from "./components/About.svelte";
  import Error from "./components/Error.svelte";
  import MovieInfo from "./components/MovieInfo.svelte";
  import LoadingMessage from "./components/LoadingMessage.svelte";
  import NoResults from "./components/NoResults.svelte";
  import MoviedLoadedNotification from "./components/MoviedLoadedNotification.svelte";

  import {
    MaterialApp,
    Card,
    CardActions,
    Button,
    Icon,
    AppBar,
    ListItem,
    Menu,
    Dialog,
    ProgressLinear,
  } from "svelte-materialify";
  import { mdiCart, mdiDotsVertical } from "@mdi/js";
  import { fade, slide } from "svelte/transition";

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  let theme = "light";
  let message;

  let waitTime = 0;
  const fetchMovies = (async () => {
    var loadingTimeCounter = setInterval(function () {
      waitTime++;
      if (waitTime > 3 && waitTime < 8) {
        message = messages.loader.subtitles[0];
      } else if (waitTime >= 8 && waitTime < 15) {
        message = messages.loader.subtitles[1];
      } else if (waitTime >= 15) {
        message = messages.loader.subtitles[2];
      }
    }, 1000);
    const response = await fetch(apiUrl);
    clearInterval(loadingTimeCounter);
    hideInfoMessage();

    return await response.json();
  })();

  let showNotification = true;
  let dialogShown = false;
  const hideInfoMessage = () => {
    setTimeout(() => {
      showNotification = false;
    }, 4000);
  };
</script>

<MaterialApp {theme}>
  <AppBar>
    <span slot="title">Movie Tickets Finder</span>
    <div style="flex-grow:1" />
    <Menu right>
      <div slot="activator">
        <Button fab depressed>
          <Icon path={mdiDotsVertical} />
        </Button>
      </div>
      <ListItem on:click={() => (dialogShown = true)}>How it works?</ListItem>
      <ListItem
        ><a href={githubLink} target="_blank">Evgeny Belov on GitHub</a
        ></ListItem
      >
    </Menu>
  </AppBar>

  <Dialog width="80%" class="pa-4 text-left" bind:active={dialogShown}>
    <About />
  </Dialog>

  {#await fetchMovies}
    <div transition:slide>
      <LoadingMessage title={messages.loader.title} subtitle={message} />
      <ProgressLinear indeterminate color="primary" />
    </div>
  {:then data}
    {#if data.movies.length === 0}
      <NoResults title={messages.notifications.noResults} />
    {:else}
      {#if showNotification}
        <MoviedLoadedNotification
          title={messages.notifications.moviesLoadedTitle}
        />
      {/if}
      <div class="d-flex flex-wrap justify-center mt-4" in:fade>
        {#each data.movies as movie (movie.id)}
          <div in:fade={{ duration: 500 }}>
            <Card style="max-width:500px" class="pa-4 ma-4">
              <div class="text-center">
                <img
                  src={movie.poster}
                  alt="PosterImage"
                  onerror="this.src='https://via.placeholder.com/300x450?text=No+poster'"
                />
                <h4 class="movie-title">{movie.title}</h4>
                <p style="color:gray;">
                  {movie.country} | {movie.rated} | ⭐ {movie.rating}
                  /10
                </p>
              </div>
              <MovieInfo {movie} />
              <CardActions class="justify-center mt-6">
                <Button outlined class="primary-text ">
                  <Icon path={mdiCart} class="mr-3" />
                  {messages.buttons.purchaseTicket.label}{movie.price}</Button
                >
              </CardActions>
            </Card>
          </div>
        {/each}
      </div>
    {/if}
  {:catch}
    <Error />
  {/await}
</MaterialApp>

<style>
  img {
    width: 300px;
    height: 450px;
  }

  h4.movie-title {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
  }
</style>
