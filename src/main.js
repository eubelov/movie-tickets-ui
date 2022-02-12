import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    apiUrl: "https://movies-api.untrap.net/api/v1/movies",
    githubLink: "https://github.com/eubelov",
    messages: {
      notifications: {
        moviesLoadedTitle: "Here are your cheapest tickets 🎉 Enjoy!",
        noResults: "Nothing found. Come back later",
      },
      buttons: {
        purchaseTicket: {
          label: "Purchase ticket for $",
        },
      },
      loader: {
        title: "Oi mate, let's find you some cheap movie tickets!",
        subtitles: [
          "Hang in there, we're working hard to find the best deals for you",
          "A little bit more, please 😉",
          "Almost there ⌛",
        ],
      },
    },
  },
});

export default app;
