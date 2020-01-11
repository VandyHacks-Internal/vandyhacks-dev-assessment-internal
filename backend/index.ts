if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import { NowRequest, NowResponse } from '@now/node';
import { parse } from 'url';

import { retrieveGeneratedData } from './retrieve';

export default async function(req: NowRequest, res: NowResponse) {
  try {
    const { query } = parse(req.url!, true);
    // console.log(query);
    let { user, level } = query;

    const levelNum = Number(level);
    if (levelNum !== 0 && levelNum !== 1 && levelNum !== 2) throw new Error('Invalid level');

    if (Array.isArray(user)) throw new Error('User is invalid');

    const problemInputText = await retrieveGeneratedData(user.toLowerCase(), levelNum);
    res.status(200).end(problemInputText);
  } catch (err) {
    res.status(401).end('Make sure your GitHub username is correctly entered.');
  }
}
