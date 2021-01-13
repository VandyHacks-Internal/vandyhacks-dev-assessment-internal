import faker from 'faker';
import { range } from 'lodash';
import { getRandomInt, generateEmailDomain } from '../util';

// Returns JSON of eventNames and their respective point values and names of attendees.

const eventNames = [
  'Lemon Bar Baking Session',
  'Storming the Capitol',
  'Talking About Our Feelings',
  'Hacking SolarWinds',
  'AoT Season 4 Marathon',
  'Skribbl.io',
  'Among Us: Squirrel Edition',
  'Vaccination Party',
  'OpenSaurus Rex Workshop',
  'Slackbot Workshop',
  'Step Down and Anchor Up',
  'HackMIT 2020',
  'Full-stack Workshop with React',
  'Fireside Chat with Jeff Bezos',
  'Neural Cloud Deep Blockchain Innovations Workshop',
  'How 2b Rich, ft. Elonos Mosquitos, King of Spain',
  'Aadarsh Talks About His Dreams',
  'Tech Talk: Overthrowing the Capitalist Machine',
  'Zoom Karaoke',
  'Sitting in Silence',
  'Sunday Service with Jeffree Star',
  'Defeating the Demon King',
  'Fast Travel to Sovngarde',
  'TypeRacer',
  'Releasing Cyberpunk 2077',
  'Delete CSS',
  'Infiltrating the Mainframe',
  'Tech Talk: Secret Joestar Technique',
  'Dinner',
  'Song Writing Workshop',
  'Sponsor Career Fair',
  'Coffee Chats ft. Members of VH Board',
  'Watch Mark Zuckerburg Shed a Whole Layer of Scales',
  'Tech Talk: Becoming Hokage',
  'Social Skills Workshop',
  'TikTok Clout Challenge',
  'Speed Dating',
  'Drip Test',
];

// Fill an array with faker data
let hackers: string[] = [];
const NUM_HACKERS = 100;
const MIN_EVENTS = 8;
const MIN_PER_EVENT = Math.ceil(NUM_HACKERS / MIN_EVENTS);
for (let i = 0; i < NUM_HACKERS; i++) {
  hackers.push(faker.name.firstName() + ' ' + faker.name.lastName());
}

let minStartTime = 1601674200000; // October 2nd, 5:30pm

const generateEntry = () => {
  const eventIndex = getRandomInt(0, eventNames.length - 1);
  const event = eventNames[eventIndex];
  eventNames.splice(eventIndex, 1); // Prevent repeats
  const score = Math.floor(Math.random() * 6) + 1;
  const startTimeStamp = Math.floor(Math.random() * 4) * 15 * 60000 + minStartTime;
  const durationMinutes = Math.floor(Math.random() * 4) * 15 + 15;
  // update to ensure chronological, non-overlapping
  minStartTime = startTimeStamp + durationMinutes * 60000;
  const startTime = new Date(startTimeStamp).toLocaleString('en-US');
  const numAttendees = getRandomInt(MIN_PER_EVENT, MIN_PER_EVENT + 4);
  let attendees: string[] = [];
  for (let i = 0; i < numAttendees; i++) {
    const hackerIndex = getRandomInt(0, hackers.length - 1);
    attendees.push(hackers[hackerIndex]);
  }
  return {
    id: eventIndex,
    eventName: event,
    startTime,
    durationMinutes,
    score,
    attendees,
  };
};

export function generate() {
  const events = new Array(getRandomInt(MIN_EVENTS, MIN_EVENTS + 4))
    .fill(0)
    .map(_ => generateEntry());
  return JSON.stringify(events);
}
