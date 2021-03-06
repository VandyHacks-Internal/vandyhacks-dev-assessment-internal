import App from './App.svelte';

const { protocol, host } = window.location;

const app = new App({
  target: document.body,
  props: {
    baseURL: protocol + '//' + host + '/api',
  },
});

export default app;
