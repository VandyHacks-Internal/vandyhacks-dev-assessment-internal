const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

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

async function fetchSolution(username, level) {
  const address = SOLVE_API + username + '/' + level.toString();
  const solution = await (await fetch(address)).json();
  return solution;
}

const dayLevelCheckers = {
  oneOne: async username => {
    const levelOneFile = 'level1/vandy_intl.txt';
    if (fs.existsSync(path.join(REPO, levelOneFile))) {
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
      console.log('xxx Missing', levelOneFile, 'xxx'); // checked
    }
  },

  oneTwo: async username => {
    const levelTwoFiles = ['level2/hackers_illegal.txt', 'level2/hackers_highest.txt'];
    const solution = await fetchSolution(username, 2);

    // Check part 1
    if (fs.existsSync(path.join(REPO, levelTwoFiles[0]))) {
      console.log('Found', levelTwoFiles[0]);
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelTwoFiles[0]), 'utf8')
        .trim()
        .split('\n');
      const solutionA = solution.answer.hackers_illegal;
      if (
        studentAnswer.length === solutionA.length &&
        studentAnswer.every((val, index) => val === solutionA[index])
      ) {
        console.log('*** Level 2A perfect match! ***'); // checked
      } else {
        // Check if just out of order
        console.log('Checking if out of order...');
        studentAnswer.sort();
        if (
          studentAnswer.length === solutionA.length &&
          studentAnswer.every((val, index) => val === solutionA[index])
        ) {
          console.log(
            '*** Level 2A match BUT non-alphabetically sorted (possibly by last name!) ***',
          );
        } else {
          console.log('*** Level 2A incorrect result ***');
        }
      }
    } else {
      console.log('xxx Missing', levelTwoFiles[0], 'xxx'); //checked
    }

    // Check for part 2.
    if (fs.existsSync(path.join(REPO, levelTwoFiles[1]))) {
      console.log('Found', levelTwoFiles[1]);
      const solutionB = solution.answer.hackers_highest;
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelTwoFiles[1]), 'utf8')
        .trim()
        .split('/n');
      // If lengths aren't the same then matching will never be true
      let matching = studentAnswer.length === solutionB.length;
      let matchOne = false;
      studentAnswer.forEach((hacker, index) => {
        const [name, score] = hacker.split(',');
        if (name === solutionB.hackers[index] && score.trim() === solutionB.score.toString()) {
          matchOne = true;
          console.log('- Match:', hacker);
        } else {
          // TODO: test
          matching = false;
          console.log(
            `- MISS: ${solutionB.hackers[index]} ${solutionB.score} (solution) vs ${hacker} (student's)`,
          );
        }
      });

      if (studentAnswer.length > 1) {
        if (matching) {
          console.log('*** Level 2B Perfect match with bonus (+0.5) ***');
        } else {
          console.log(
            'xxx Student includes more than one but fewer than all highest hackers (still apply +0.5 bonus) xxx',
          );
        }
      } else if (studentAnswer.length === 1 && matchOne) {
        console.log('*** Level 2B match (TODO: manually check for bonus) ***');
      } else {
        console.log('xxx Level 2B no match xxx');
      }
    } else {
      console.log('xxx Missing', levelTwoFiles[1], 'xxx');
    }
  },

  twoOne: async username => {
    const levelOneFile = 'level1/vandy_diet.txt';
    if (fs.existsSync(path.join(REPO, levelOneFile))) {
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
      console.log('xxx Missing', levelOneFile, 'xxx');
    }
  },

  twoTwo: async username => {
    const levelTwoFiles = ['level2/teams.json', 'level2/overflow.txt'];
    const solution = await fetchSolution(username, 2);
    // Check part 1
    if (fs.existsSync(path.join(REPO, levelTwoFiles[0]))) {
      console.log('Found', levelTwoFiles[0]);
      const studentAnswer = JSON.parse(
        fs.readFileSync(path.join(REPO, levelTwoFiles[0]), 'utf8').trim(),
      );
      const solutionA = solution.answer.newTeamsFormatted;

      // Because no order was imposed, sort both solution and student answer
      function compare(a, b) {
        if (a.teamName < b.teamName) {
          return -1;
        } else if (a.teamName > b.teamName) {
          return 1;
        } else {
          return 0;
        }
      }
      studentAnswer.sort(compare);
      solutionA.sort(compare);

      // Check equality across all teams and their members
      const matching =
        studentAnswer.length === solutionA.length &&
        studentAnswer.every((team, i) => {
          const subMatch =
            team.teamName.trim() === solutionA[i].teamName.trim() &&
            team.members.every((member, j) => {
              return (
                member.name === solutionA[i].members[j].name &&
                member.joinTime === solutionA[i].members[j].joinTime
              );
            });
          return subMatch;
        });
      if (matching) {
        console.log('*** Level 2 Perfect Match! ***');
      } else {
        console.log('xxx Level 2A incorrect result xxx');
      }
    } else {
      console.log('xxx Missing', levelTwoFiles[0], 'xxx');
    }

    // Check for part 2.
    if (fs.existsSync(path.join(REPO, levelTwoFiles[1]))) {
      console.log('Found', levelTwoFiles[1]);
      const solutionB = solution.answer.overLimitTeams;
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelTwoFiles[1]), 'utf8')
        .trim()
        .split('\n');
      if (
        studentAnswer.length === solutionB.length &&
        studentAnswer.every((teamName, i) => teamName.trim() === solutionB[i].trim())
      ) {
        console.log('*** Level 2B Perfect Match! ***');
      } else {
        // Check to see if they just put it out of order
        solutionB.forEach((name, i) => (solutionB[i] = name.toLowerCase()));
        studentAnswer.sort();
        solutionB.sort();
        if (
          studentAnswer.length === solutionB.length &&
          studentAnswer.every((teamName, i) => teamName.trim() === solutionB[i].trim())
        ) {
          console.log('xxx Level 2B match but not formatted xxx');
        } else {
          console.log('xxx Level 2B incorrect answer xxx');
        }
      }
    } else {
      console.log('xxx Missing', levelTwoFiles[1], 'xxx');
    }
  },
  twoThree: async username => {
    const levelThreeFile = 'level3/comics.txt';
    if (fs.existsSync(path.join(REPO, levelThreeFile))) {
      console.log('Found', levelThreeFile);
      const studentAnswer = fs
        .readFileSync(path.join(REPO, levelThreeFile), 'utf8')
        .trim()
        .split('\n');
      console.log('Getting solution. This may take a second...');
      let solution = await fetchSolution(username, 3);
      solution = solution.answer.trim().split('\n');
      if (
        studentAnswer.length === solution.length &&
        studentAnswer.every((alt, i) => alt === solution[i])
      ) {
        console.log('*** Level 3 Perfect Match! ***');
      } else {
        // Check if just not in correct order
        studentAnswer.sort();
        solution.sort();
        if (
          studentAnswer.length === solution.length &&
          studentAnswer.every((teamName, i) => teamName === solution[i])
        ) {
          console.log('xxx Level 3 match but not sorted xxx');
        } else {
          console.log('xxx Level 3 incorrect answer xxx');
        }
      }
    } else {
      console.log('xxx Missing', levelThreeFile, 'xxx');
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
