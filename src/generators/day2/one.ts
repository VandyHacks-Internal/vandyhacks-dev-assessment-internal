import faker from 'faker';
import { getRandomInt, generateEmailDomain } from '../util';
import { races, genders, diets } from './fakeData';

// Returns CSV with following cols: Name, Phone, Email, Gender, Race, Dietary Restrictions

const generateDietaryRestriction = (rate: number): string => {
  // Generate random country code (including US) if random number below given rate
  if (Math.random() > rate) {
    return 'None';
  } else {
    const index = getRandomInt(0, diets.length - 1);
    return diets[index];
  }
};

const generateRace = (): string => {
  const index = getRandomInt(0, races.length - 1);
  return races[index];
};

const generateGender = (): string => {
  const index = getRandomInt(0, genders.length - 1);
  return genders[index];
};

const generateLine = (): [string, string, string, string, string, string] => {
  const email = faker.internet.userName() + generateEmailDomain();
  const race = generateRace();
  const gender = generateGender();
  const diet = generateDietaryRestriction(0.4);

  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    race,
    gender,
    diet,
  ];
};

export function generate(user: string) {
  const users = new Array(getRandomInt(480, 540)).fill(0).map(_ => generateLine());

  users.unshift(['Name', 'Phone', 'Email', 'Race', 'Gender', 'Dietary Restriction']);
  return users.map(el => el.join(',')).join('\n');
}
