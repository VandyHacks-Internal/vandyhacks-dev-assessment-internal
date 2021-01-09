// import faker from 'faker';
// import { getRandomInt, generateEmailDomain } from '../util';

// const generateEntry = (vanderbiltFrequency: number) => {
//   const email = faker.internet.userName() + generateEmailDomain(vanderbiltFrequency);

//   return {
//     name: faker.name.firstName() + ' ' + faker.name.lastName(),
//     phone: faker.phone.phoneNumber(),
//     email,
//   };
// };

// export function generate() {
//   const vanderbiltFrequency = Math.random() * 0.8 + 0.2; // from .2 to 1
//   const users = new Array(getRandomInt(82, 123))
//     .fill(0)
//     .map(_ => generateEntry(vanderbiltFrequency));

//   return JSON.stringify(users);
// }

import faker from 'faker';
import { getRandomInt, generateEmailDomain } from '../util';

// Returns CSV with following cols: Name, Phone, Email, Country Code, gradYear

const generateLine = (): [string, string, string, string, string] => {
  const email = faker.internet.userName() + generateEmailDomain();
  const gradYear = getRandomInt(2021, 2024)
  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    faker.address.countryCode(),
    gradYear.toString()
  ];
};

export function generate() {
  const users = new Array(getRandomInt(480, 540)).fill(0).map(_ => generateLine());

  users.unshift(['Name', 'Phone', 'Email', 'Country Code', 'Grad Year']);
  return users.map(el => el.join(',')).join('\n');
}

