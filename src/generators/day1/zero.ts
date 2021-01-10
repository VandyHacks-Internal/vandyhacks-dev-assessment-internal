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

