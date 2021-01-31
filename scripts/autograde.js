const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Call with node auograde.js <path_to_REPO>

const REPO = process.argv[2];
const SOLVE_API = 'https://inputs.vandyhacks.dev/api/solve/';

function validatePath() {
  // Check if provided name valid
  let name;
  try {
    name = path.basename(REPO);
  } catch (error) {
    throw 'Error: please provide a path to the REPO to be graded';
  }
  const prefix = name.slice(0, 28);
  if (prefix !== 'dev-assessment-2021-day-one-' && prefix !== 'dev-assessment-2021-day-two-') {
    throw 'Error: provided path is not a valid 2021 dev assessment REPO';
  }

  if (!fs.existsSync(REPO)) {
    throw 'Error: provided path does not exist';
  }
}

function checkExistAndNonEmpty(basename) {
  if (!fs.existsSync(path.join(REPO, basename))) {
    return false;
  }
  const file = fs.readFileSync(path.join(REPO, basename), 'utf8');
  return file !== undefined && file.length > 0;
}

async function fetchSolution(username, level) {
  const address = SOLVE_API + username + '/' + level.toString();
  const solution = await (await fetch(address)).json();
  return solution;
}

function checkArraysMatch(studentAnswer, solution) {
  const diff = _.differenceWith(studentAnswer, solution, _.isEqual);
  if (diff.length === 0) {
    console.log('*** Perfect match! ***'); // checked
  } else {
    // Check if just out of order
    console.log('No perfect match. Checking if out of order...');
    const solutionSorted = solution.concat().sort();
    const studentAnswerSorted = studentAnswer.concat().sort();
    const sortedDiff = _.differenceWith(solutionSorted, studentAnswerSorted, _.isEqual);
    if (sortedDiff.length === 0) {
      console.log('*** Match BUT not sorted ***');
    } else {
      console.log('xxx Incorrect result xxx');
      console.log('diff:', diff);
    }
  }
}

function deepCompareTeams(studentAnswer, solution) {
  // Because no order was imposed, sort both solution and student answer
  function compareTeams(a, b) {
    if (a.teamName < b.teamName) {
      return -1;
    } else if (a.teamName > b.teamName) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareMembers(a, b) {
    if (a.joinTime < b.joinTime) {
      return -1;
    } else if (a.joinTime > b.joinTime) {
      return 1;
    } else {
      return 0;
    }
  }
  const studentAnswerSorted = studentAnswer
    .map(team => {
      return { teamName: team.teamName.toLowerCase(), members: team.members };
    })
    .sort(compareTeams);
  const solutionSorted = solution
    .map(team => {
      return { teamName: team.teamName.toLowerCase(), members: team.members };
    })
    .sort(compareTeams);

  // Deep sort all members
  for (const team of studentAnswerSorted) {
    team.members = team.members.sort(compareMembers);
  }
  for (const team of solutionSorted) {
    team.members = team.members.sort(compareMembers);
  }

  // Run full comparison
  const matching =
    studentAnswer.length === solution.length &&
    studentAnswer.every(
      (team, i) =>
        team.teamName.trim() === solution[i].teamName.trim() &&
        team.members.every(
          (member, j) =>
            member.name === solution[i].members[j].name &&
            member.joinTime === solution[i].members[j].joinTime,
        ),
    );
  if (matching) {
    console.log('*** Level 2a Perfect Match ***');
  } else {
    console.log('xxx Level 2a incorrect result xxx');
  }
}

async function containsInvalidInput(username) {
  // For day 2 level 3
  const generateAPI = 'https://inputs.vandyhacks.dev/api/generate/';
  const address = generateAPI + username + '/3';
  let input = await (await fetch(address)).text();
  input = input.trim().split('\n');

  return input.includes('0') || input.includes('404');
}

const dayLevelCheckers = {
  oneOne: async username => {
    const levelOneFile = 'level1/vandy_intl.txt';
    if (checkExistAndNonEmpty(levelOneFile)) {
      console.log('Found', levelOneFile);
      const studentAnswer = fs.readFileSync(path.join(REPO, levelOneFile), 'utf8').trim();
      const solution = await fetchSolution(username, 1);
      console.log('- student:', studentAnswer);
      console.log('- solution:', solution.answer.toString());
      if (studentAnswer === solution.answer.toString()) {
        console.log('*** Level 1 perfect match! ***'); // checked`
      } else {
        console.log('xxx Level 1 incorrect result xxx');
      }
    } else {
      console.log('xxx Missing or empty', levelOneFile, 'xxx'); // checked
    }
  },

  oneTwo: async username => {
    const levelTwoFiles = ['level2/hackers_illegal.txt', 'level2/hackers_highest.txt'];
    const solution = await fetchSolution(username, 2);

    // Check part 1
    if (checkExistAndNonEmpty(levelTwoFiles[0])) {
      console.log('Found', levelTwoFiles[0]);
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelTwoFiles[0]), 'utf8')
        .trim()
        .split('\n');
      const solutionA = solution.answer.hackers_illegal;
      console.log('Checking Level 2A...');
      checkArraysMatch(studentAnswer, solutionA);
    } else {
      console.log('xxx Missing or empty', levelTwoFiles[0], 'xxx');
    }

    // Check for part 2.
    if (checkExistAndNonEmpty(levelTwoFiles[1])) {
      console.log('Found', levelTwoFiles[1]);
      const solutionB = solution.answer.hackers_highest.hackers.sort();
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelTwoFiles[1]), 'utf8')
        .trim()
        .split('/n')
        .sort();
      // If lengths aren't the same then matching will never be true
      if (studentAnswer.length === 1) {
        const answers = studentAnswer[0].split(',');
        score.A;
        if (
          solutionB.includes(answers[0]) &&
          solution.answer.hackers_highest.score.toString() === answers[1].trim()
        ) {
          console.log(
            '*** Level 2 exact match (TODO: manual check to see if student accounted for multiple top hackers) ***',
          );
        } else {
          console.log('xxx Level 2B incorrect result xxx');
        }
      } else {
        console.log(
          'Student accounted for multiple hackers. Checking answer (note, an unsorted match is equally valid as a sorted match here)',
        );
        // First check score
        const solutionScore = solution.answer.hackers_highest.score.trim();
        if (
          _.isEqual(
            studentAnswer.forEach(pair => pair.split('/')[1].trim()),
            new Array(studentAnswer.length).fill(solutionScore),
          )
        ) {
          console.log('Level 2B score match. Now check hacker names...');
          checkArraysMatch(
            studentAnswer.forEach(pair => pair.split('/')[0].trim()),
            solutionB,
          );
        } else {
          console.log('xxx Level 2B incorrect result xxx');
        }
      }
    } else {
      console.log('xxx Missing or empty', levelTwoFiles[1], 'xxx');
    }
  },

  twoOne: async username => {
    const levelOneFile = 'level1/vandy_diet.txt';
    if (checkExistAndNonEmpty(levelOneFile)) {
      console.log('Found', levelOneFile);
      const studentAnswer = fs.readFileSync(path.join(REPO, levelOneFile), 'utf8').trim();
      const solution = await fetchSolution(username, 1);
      console.log('- student:', studentAnswer);
      console.log('- solution:', solution.answer.toString());
      if (studentAnswer === solution.answer.toString()) {
        console.log('*** Level 1 perfect match! ***');
      } else {
        console.log('xxx Level 1 incorrect result xxx');
      }
    } else {
      console.log('xxx Missing or empty', levelOneFile, 'xxx');
    }
  },

  twoTwo: async username => {
    const levelTwoFiles = ['level2/teams.json', 'level2/overflow.txt'];
    const solution = await fetchSolution(username, 2);
    // Check part 1
    if (checkExistAndNonEmpty(levelTwoFiles[0])) {
      console.log('Found', levelTwoFiles[0]);
      const studentAnswer = JSON.parse(
        fs.readFileSync(path.join(REPO, levelTwoFiles[0]), 'utf8').trim(),
      );
      const solutionA = solution.answer.teams;

      // Check equality across all teams and their members
      deepCompareTeams(studentAnswer, solutionA);
    } else {
      console.log('xxx Missing or empty', levelTwoFiles[0], 'xxx');
    }

    // Check for part 2.
    if (checkExistAndNonEmpty(levelTwoFiles[1])) {
      console.log('Found', levelTwoFiles[1]);
      const solutionB = solution.answer.overflow.map(team => team.toLowerCase());
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelTwoFiles[1]), 'utf8')
        .trim()
        .split('\n')
        .map(team => team.toLowerCase());
      console.log('Checking level 2...');
      checkArraysMatch(studentAnswer, solutionB);
    } else {
      console.log('xxx Missing or empty', levelTwoFiles[1], 'xxx');
    }
  },
  twoThree: async username => {
    const levelThreeFile = 'level3/comics.txt';
    if (checkExistAndNonEmpty(levelThreeFile)) {
      console.log('Found', levelThreeFile);
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelThreeFile), 'utf8')
        .trim()
        .split('\n');
      console.log('Getting solution. This may take a second...');
      let solution = await fetchSolution(username, 3);
      solution = solution.answer;
      console.log('Checking level 3...');
      // I made an error here and included 0 and 404 as inputs when they really shouldn't be.
      if (containsInvalidInput(username)) {
        console.log(
          '[NOTE] User has bad input (includes 0 or 404). If the script marks their answer wrong, it may be because of this.',
        );
      }
      checkArraysMatch(studentAnswer, solution);
    } else {
      console.log('xxx Missing or empty', levelThreeFile, 'xxx');
    }
  },
};

async function checkAnswers() {
  // Assumes path is valid
  const basename = path.basename(REPO);
  const username = basename.slice(28);
  const day = basename.slice(24, 27) === 'one' ? 1 : 2;
  if (day === 1) {
    await dayLevelCheckers.oneOne(username);
    await dayLevelCheckers.oneTwo(username);
  } else {
    await dayLevelCheckers.twoOne(username);
    await dayLevelCheckers.twoTwo(username);
    await dayLevelCheckers.twoThree(username);
  }
}

(async () => {
  validatePath();
  checkAnswers();
})().catch(error => {
  console.log(error);
});
