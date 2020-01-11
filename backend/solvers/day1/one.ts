const START = 9 * 3600 + 3 * 60;
const END = 14 * 3600 + 38 * 60;

interface HourMap {
  [propName: number]: number;
}

const updateHourMap = (hour: number, hourMap: HourMap) => {
  if (hourMap[hour] == null) hourMap[hour] = 1;
  else hourMap[hour]++;
};

export function solve(input: string): { answer: { one: number; two: number } } {
  const parsedData = input
    .split('\n')
    .map(el => {
      const [_, __, ___, checkin] = el.split(',');
      const [hour, minute, second] = checkin.split(':').map(el => Number(el));

      return [hour, hour * 3600 + minute * 60 + second];
    })
    .slice(1);

  let one = 0;
  const hourMap: HourMap = {};

  for (let [hour, time] of parsedData) {
    if (START <= time && time <= END) one++;
    updateHourMap(hour, hourMap);
  }

  const [maxHour] = Object.entries(hourMap).reduce(
    ([currMaxHour, currMax], [hour, count]) => {
      if (count > currMax) return [hour, count];

      return [currMaxHour, currMax];
    },
    ['', 0],
  );

  return { answer: { one, two: Number(maxHour) } };
}
