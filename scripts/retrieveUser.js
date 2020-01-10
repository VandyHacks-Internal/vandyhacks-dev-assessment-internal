require('dotenv').config();

const firebase = require('firebase');
const readline = require('readline-promise').default; //smh commonjs

firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

(async () => {
  const rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  const userName = await rlp.questionAsync('Type GitHub name exactly:\n');

  const rawData = (
    await firebase
      .database()
      .ref(`/users/${userName}/`)
      .once('value')
  ).val();

  console.log(rawData.day, rawData.input ? Object.entries(rawData.input).length : 0);
  process.exit(0);
})();
