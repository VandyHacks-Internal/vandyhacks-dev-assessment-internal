const DEPOSIT_COST = 10;

interface BusMap {
  GT: [number, number];
  IIT: [number, number];
  Purdue: [number, number];
  UIUC: [number, number];
}

type Route = 'GT' | 'IIT' | 'Purdue' | 'UIUC';

interface TwoAnswerFormat {
  GT: number;
  IIT: number;
  Purdue: number;
  UIUC: number;
}

const updateBusMap = (route: Route, showedUp: boolean, busMap: BusMap) => {
  if (!busMap[route]) busMap[route] = [showedUp ? 1 : 0, 1];
  else {
    busMap[route][0] += showedUp ? 1 : 0;
    busMap[route][1]++;
  }
};

export function solve(input: string): { answer: { one: number; two: TwoAnswerFormat } } {
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
    one += showedUp ? 0 : DEPOSIT_COST;
  }

  const two: TwoAnswerFormat = {
    GT: busMap.GT[0] / busMap.GT[1],
    IIT: busMap.IIT[0] / busMap.IIT[1],
    UIUC: busMap.UIUC[0] / busMap.UIUC[1],
    Purdue: busMap.Purdue[0] / busMap.Purdue[1],
  };

  return {
    answer: {
      one,
      two,
    },
  };
}
