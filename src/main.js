import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    apiUrl: "https://movies-api.untrap.net/api/v1/movies",
  },
});

export default app;
