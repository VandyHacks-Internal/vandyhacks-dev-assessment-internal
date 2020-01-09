import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    rootUrl: 'http://localhost:8080',
  },
});

export default app;
