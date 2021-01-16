import faker from 'faker';
import { getRandomInt, generateEmailDomain } from '../util';

// Returns CSV with following cols: Name, Phone, Email, Country Code, gradYear

const generateCountryCode = (rate: number): string => {
  // Generate random country code (including US) if random number below given rate
  if (Math.random() > rate) {
    return 'US';
  } else {
    return faker.address.countryCode();
  }
};
const generateLine = (): [string, string, string, string, string] => {
  const email = faker.internet.userName() + generateEmailDomain();
  const gradYear = getRandomInt(2021, 2024);
  // To keep somewhat realistic, only generate ~ 10-20% international students
  const countryCode = generateCountryCode(0.2);
  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    countryCode,
    gradYear.toString(),
  ];
};

export function generate(user: string) {
  const users = new Array(getRandomInt(480, 540)).fill(0).map(_ => generateLine());

  users.unshift(['Name', 'Phone', 'Email', 'Country Code', 'Grad Year']);
  return users.map(el => el.join(',')).join('\n');
}
