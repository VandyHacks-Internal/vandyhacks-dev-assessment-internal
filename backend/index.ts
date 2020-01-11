if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import { NowRequest, NowResponse } from '@now/node';
import { parse } from 'url';

import { retrieveGeneratedData } from './retrieve';
import { getProblemSolution } from './solvers/selector';

export default async function(req: NowRequest, res: NowResponse) {
  try {
    const { query } = parse(req.url!, true);
    // console.log(query);
    let { user, level, mode } = query;

    if (mode == null) mode = 'generate';

    if (Array.isArray(user)) throw new Error('User is invalid');
    user = user.toLowerCase();

    const levelNum = Number(level);

    if (levelNum !== 0 && levelNum !== 1 && levelNum !== 2) throw new Error('Invalid level');

    if (mode === 'generate') {
      const generatedInput = await retrieveGeneratedData(user, levelNum);
      res.status(200).end(generatedInput);
    } else if (mode === process.env.SOLVE_SECRET) {
      const problemSolution = JSON.stringify(await getProblemSolution(user, levelNum));
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(problemSolution);
    }
  } catch (err) {
    res.status(401).end('Make sure the GitHub username is correctly entered.');
  }
}
