import express, { Request, Response } from 'express';
const generateRouter = express.Router();
import { retrieveGeneratedData } from './';
import { Level } from '../types';

const handler = async (req: Request, res: Response) => {
  if (req.params.user.toLowerCase() == undefined) return res.status(501).end('No user specified');

  const level = Number(req.params.level) as Level;
  try {
    const rtn = await retrieveGeneratedData(req.params.user.toLowerCase(), level);
    return res.end(rtn);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .end(
        'Error: please make sure you have entered the GitHub username you provided to us via email. If you have just given us your GitHub username, we will get back to your shortly! If you still have questions, reach out to dev@vandyhacks.org.',
      );
  }
};

// Default to level 0
generateRouter.get('/:user', async (req, res) => {
  return res.redirect(`/${req.params.user.toLowerCase()}/0`);
});

generateRouter.get('/:user/:level', async (req, res) => handler(req, res));

export default generateRouter;
