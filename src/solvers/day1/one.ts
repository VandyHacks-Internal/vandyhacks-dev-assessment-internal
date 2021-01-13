interface scoreMap {
  [name: string]: number;
}

export function solve(input: string) {
  const data = JSON.parse(input);
  const recalculated: scoreMap = {};
  for (let { attendees } of data) {
    const filtered = [...new Set(attendees)];
    for (let attendee of filtered) {
      // obligatory type check
      if (typeof attendee === 'string') {
        recalculated[attendee] = 1 + (recalculated[attendee] || 0);
      } else {
        // Should never get here
        throw 'Someone (me) made an oopsie. Please contact sam@vandyhacks.org with a scathing bug report.';
      }
    }
  }
  console.log(recalculated);
  return recalculated;
}
