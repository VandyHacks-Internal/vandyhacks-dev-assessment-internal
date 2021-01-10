import faker from 'faker';

export function generateEmailDomain(vanderbiltFrequency: number = 0.23) {
  if (Math.random() < vanderbiltFrequency) return '@vanderbilt.edu';
  // everything from this point on is proportional to 1-vanderbiltFrequency
  const rand = Math.random();

  if (rand < 0.15) {
    return '@gatech.edu';
  } else if (rand < 0.32) {
    return '@purdue.edu';
  } else if (rand < 0.6) {
    return '@gmail.com';
  } else if (rand < 0.8) {
    return '@' + faker.internet.domainName();
  } else if (rand < 1) {
    return '@hotmail.com';
  }

  return '@yahoo.com';
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
