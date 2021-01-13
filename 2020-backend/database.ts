import firebase from 'firebase';

let app: firebase.app.App | null = null;

export const getFirebaseAppInstance = () => {
  if (app === null) {
    app = firebase.initializeApp({
      databaseURL: process.env.DATABASE_URL,
    });
  }

  return app;
};
