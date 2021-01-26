require('dotenv').config();

const firebase = require('firebase');
const toAddList = require('./toAddList');
const readline = require('readline-promise').default; //smh commonjs

firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

(async () => {
  console.log(
    `You are about to add ${toAddList.length} users to the Firebase for this dev assessment. This is a hard-to-reverse operation.\n`,
  );

  const rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  const firstProceed = await rlp.questionAsync("Are you sure you'd like to proceed? (type yes) \n");
  if (firstProceed !== 'yes') process.exit(1);

  let mutableList = toAddList.slice();
  mutableList = mutableList.map(({ user, day }) => ({
    user: user.toLowerCase(),
    day: Number(day),
  }));

  if (
    mutableList.some(({ day }) => {
      return day !== 1 && day !== 2 && day != 2.5;
    })
  )
    throw new Error('At least one of your days is not 1 or 2');

  console.log("\nHere are the additions you're making. Please confirm them as valid:\n");
  console.table(mutableList);

  const secondProceed = await rlp.questionAsync(
    "Are you ABSOLUTELY sure you'd like to proceed? (type yes) \n",
  );
  if (secondProceed.toLowerCase() !== 'yes') process.exit(1);

  const updates = mutableList.reduce((acc, { user, day }) => {
    acc['/users/' + user] = { day };
    return acc;
  }, {});

  try {
    await firebase
      .database()
      .ref()
      .update(updates);
  } catch (err) {
    console.error('Your changes failed to push to Firebase:\n' + err);
    process.exit(1);
  }

  console.log('\nUpdate successful!');
  process.exit(0);
})();
