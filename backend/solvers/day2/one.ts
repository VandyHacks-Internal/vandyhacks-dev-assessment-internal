const DEPOSIT_COST = 10;

interface BusMap {
  GT: number;
  IIT: number;
  Purdue: number;
  UIUC: number;
}

type Route = 'GT' | 'IIT' | 'Purdue' | 'UIUC';

const updateBusMap = (route: Route, busMap: BusMap) => {
  if (busMap[route] == null) busMap[route] = 1;
  else busMap[route]++;
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
  const busMap: BusMap = { GT: 0, IIT: 0, Purdue: 0, UIUC: 0 };
  for (let { busRoute, showedUp } of parsedData) {
    updateBusMap(busRoute as Route, busMap);
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
