// TODO: TEST!

export function solve(input: string) {
  const teams: {
    teamName: string;
    members: { name: string; joinTime: number }[];
  }[] = ([] = JSON.parse(input));

  // Get all hackers' final registrations (map to teamName and join time)
  const hackers: Map<string, [string, number]> = new Map();
  teams.forEach(team => {
    team.members.forEach(member => {
      const hacker = hackers.get(member.name);
      if ((hacker !== undefined && hacker[1] < member.joinTime) || hacker === undefined) {
        hackers.set(member.name, [team.teamName, member.joinTime]);
      }
    });
  });

  // Now build teams back up with unique hackers
  const newTeams: Map<string, { name: string; joinTime: number }[]> = new Map();
  hackers.forEach((hackerInfo, hackerName) => {
    const newTeam = newTeams.get(hackerInfo[0]);
    if (newTeam !== undefined) {
      newTeam.push({ name: hackerName, joinTime: hackerInfo[1] });
    } else {
      newTeams.set(hackerInfo[0], [{ name: hackerName, joinTime: hackerInfo[1] }]);
    }
  });

  // Now change to format of input data (that is, an array)
  const newTeamsFormatted: {
    teamName: string;
    members: { name: string; joinTime: number }[];
  }[] = [];

  newTeams.forEach((members, teamName) => {
    newTeamsFormatted.push({ teamName, members });
  });

  // Now get question 2
  const overLimitTeams: string[] = [];
  const MAX_MEMBERS = 4;
  for (const newTeam of newTeamsFormatted) {
    if (newTeam.members.length > MAX_MEMBERS) {
      overLimitTeams.push(newTeam.teamName);
    }
  }

  return { answer: { newTeamsFormatted, overLimitTeams } };
}
