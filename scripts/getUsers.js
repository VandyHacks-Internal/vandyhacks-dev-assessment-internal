require('dotenv').config();

const firebase = require('firebase');
firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

(async () => {
  const rawData = (
    await firebase
      .database()
      .ref('/users/')
      .once('value')
  ).val();

  console.table(
    Object.entries(rawData).map(([user, userInfo]) => {
      return { user, day: userInfo.day };
    }),
  );

  process.exit(0);
})();
