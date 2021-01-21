export function solve(input: string) {
  const data = JSON.parse(input);
  const cheaters: Map<string, 1> = new Map();
  const recalculated: Map<string, number> = new Map();
  let highestScore: number = 0;
  for (let { attendees } of data) {
    const realAttendees: Map<string, 1> = new Map();
    for (let attendee of attendees) {
      if (realAttendees.has(attendee) && !cheaters.has(attendee)) {
        cheaters.set(attendee, 1);
      } else {
        const score: number = 1 + (recalculated.get(attendee) || 0);
        highestScore = highestScore = score > highestScore ? score : highestScore;
        recalculated.set(attendee, score);
      }
      realAttendees.set(attendee, 1);
    }
  }
  // Get highest scoring hackers
  const highestScoringHackers: string[] = [];
  for (let [k, v] of recalculated.entries()) {
    if (v === highestScore) {
      highestScoringHackers.push(k);
    }
  }
  console.log('cheaters:', cheaters);
  const cheaterNames = [...cheaters.keys()];
  cheaterNames.sort();
  highestScoringHackers.sort();
  const output = {
    answer: {
      hackers_illegal: cheaterNames,
      hackers_highest: { score: highestScore, hackers: highestScoringHackers },
    },
  };
  console.log(output);
  return output;
}
