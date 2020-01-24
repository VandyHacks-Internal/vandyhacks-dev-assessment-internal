const DEPOSIT_COST = 10;

interface BusMap {
  GT: [number, number];
  IIT: [number, number];
  Purdue: [number, number];
  UIUC: [number, number];
}

type Route = 'GT' | 'IIT' | 'Purdue' | 'UIUC';

const updateBusMap = (route: Route, showedUp: boolean, busMap: BusMap) => {
  if (!busMap[route]) busMap[route] = [showedUp ? 1 : 0, 1];
  else {
    busMap[route][0] += showedUp ? 1 : 0;
    busMap[route][1]++;
  }
};

export function solve(input: string): { answer: { one: number; two: BusMap } } {
  const parsedData = input
    .split('\n')
    .map(el => {
      const [_, __, ___, busRoute, ____, showedUp] = el.split(',');

      return { busRoute, showedUp: showedUp === 'true' };
    })
    .slice(1);

  let one = 0;
  const busMap: BusMap = { GT: [0, 0], Purdue: [0, 0], UIUC: [0, 0], IIT: [0, 0] };
  for (let { busRoute, showedUp } of parsedData) {
    updateBusMap(busRoute as Route, showedUp, busMap);
    one += showedUp ? DEPOSIT_COST : 0;
  }

  // const [two] = Object.entries(busMap).reduce(
  //   (acc, [route, curr]) => {
  //     if (curr > acc[1]) return [route, curr];
  //     return acc;
  //   },
  //   ['', 0],
  // );

  return { answer: { one, two: busMap } };
}
