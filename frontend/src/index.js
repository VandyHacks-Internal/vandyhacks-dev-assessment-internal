import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    baseURL: 'http://localhost:3000/backend/',
  },
});

export default app;
