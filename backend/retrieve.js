const { getAllProblemsInputData } = require('./generators/selector');
const firebase = require('firebase');

firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

exports.retrieveGeneratedData = async (user, level) => {
  const userRef = firebase.database().ref('/users/' + user);
  const dbValues = (await userRef.once('value')).val();

  let inputData;
  if (!dbValues.inputs) {
    // generate and set inputs
    inputData = getAllProblemsInputData(dbValues.day);

    const update = { ['/users/' + user + '/inputs']: inputData };
    await firebase
      .database()
      .ref()
      .update(update);
  } else {
    inputData = dbValues.inputs;
  }

  return inputData[level];
};
