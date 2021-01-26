import faker from 'faker';
import { range } from 'lodash';
import { getRandomInt, generateEmailDomain } from '../util';

// Returns JSON of eventNames and their respective point values and names of attendees.

// Get all hackers
let hackers: string[] = [];
let num_hackers = getRandomInt(600, 700);
for (let i = 0; i < num_hackers; i++) {
  hackers.push(faker.name.firstName() + ' ' + faker.name.lastName());
}
// Ensure all hackers unique
hackers = [...new Set(hackers)];
num_hackers = hackers.length;

let minStartTime = 1601674200000; // October 2nd, 5:30pm

const generateTeamName = () => {
  const choice = getRandomInt(0, 2);
  const options = [faker.commerce.productName, faker.company.bs, faker.random.word];
  return options[choice]();
};

// Get all teams
let teams: { teamName: string; members: { name: string; joinTime: number }[] }[] = [];
let num_teams = getRandomInt(200, 300);
for (let i = 0; i < num_teams; i++) {
  teams.push({ teamName: generateTeamName(), members: [] });
}
// Ensure all unique inputs
teams = [...new Set(teams)];
num_teams = teams.length;
console.log('num_teams:', num_teams);
const generateTeams = () => {
  // Start placing members in teams
  for (let i = 0; i < hackers.length; i++) {
    const hacker = hackers[i];

    // Hacky but just making sure around half of hackers only register once
    let numRegis = getRandomInt(1, 2);
    if (numRegis == 2) {
      numRegis = getRandomInt(2, 3);
    }
    const offset = getRandomInt(1000000, 2000000);
    let joinTime = getRandomInt(minStartTime, minStartTime + offset);
    for (let j = 0; j < numRegis; j++) {
      const teamIndex = getRandomInt(0, num_teams - 1);
      /*
      If no hackers have joined yet, start from random start time.
      Else, current hacker must join at a time such that:
        1. Their timestamp is after everyone else in the team
        2. They would have joined after leaving their previous team
      */
      if (teams[teamIndex].members.length > 0) {
        joinTime = Math.max(joinTime, teams[teamIndex].members.slice(-1)[0].joinTime) + offset;
      } else {
        joinTime += offset;
      }
      teams[teamIndex].members.push({ name: hacker, joinTime: joinTime });
    }
  }

  // Enforce edge case of one hacker double registering their own team
  const weirdTeam = getRandomInt(0, teams.length - 1);
  teams[weirdTeam].members.push(teams[weirdTeam].members[0]);

  return teams;
};

export function generate(user: string) {
  const teams = generateTeams();
  // Clean up teams that are empty
  for (let i = num_teams - 1; i >= 0; i--) {
    if (teams[i].members.length == 0) {
      teams.splice(i, 1);
    }
  }
  return JSON.stringify(teams);
}
