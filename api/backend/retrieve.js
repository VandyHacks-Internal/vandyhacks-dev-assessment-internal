const { getProblemInputData, getAllProblemsInputData } = require('./generators/selector');
const firebase = require('firebase/database');

firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

exports.retrieveGeneratedData = async (user, level) => {
  const userRef = firebase.database().ref('users/' + user);

  userRef.once('value', snapshot => {
    if (snapshot.inputs == null) {
      // set inputs
    } else {
      // return current ones
    }
  });

  return getProblemInputData(2, level);
};
