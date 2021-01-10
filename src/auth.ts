import { Strategy } from 'passport-github';
import { getFirebaseAppInstance } from './database';

if (process.env.GITHUB_CLIENT_ID === undefined) throw new Error('Need GITHUB_CLIENT_ID');
if (process.env.GITHUB_CLIENT_SECRET === undefined) throw new Error('Need GITHUB_CLIENT_SECRET');

export const configuredGithubStrategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/user',
  },
  async function(_, __, profile, cb) {
    const firebase = getFirebaseAppInstance();

    try {
      const data = (
        await firebase
          .database()
          .ref(`/users/${profile.username}/`)
          .once('value')
      ).val();

      return cb(null, profile.username);
    } catch (err) {
      return cb(new Error('Not a valid user.'));
    }
  },
);
