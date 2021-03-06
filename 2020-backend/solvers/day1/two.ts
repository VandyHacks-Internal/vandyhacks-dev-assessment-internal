import fetch from 'node-fetch';

const API_URL = 'https://api.exchangeratesapi.io/';
const CURRENCY = 'GBP';

const getApiURL = (date: string) => {
  return `${API_URL}${date}?symbols=${CURRENCY}`;
};

const fetchByDate = async (date: string): Promise<number> => {
  return (await (await fetch(getApiURL(date))).json()).rates[CURRENCY];
};

export async function solve(input: string): Promise<{ answer: number[] }> {
  const dates = JSON.parse(input);

  return {
    answer: await Promise.all(
      dates.map(async (date: string): Promise<number> => fetchByDate(date)),
    ),
  };
}
