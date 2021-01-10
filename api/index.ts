import express, { Request, Response, Express } from 'express';
import { getProblemSolution } from '../src/solvers';
import { retrieveGeneratedData } from '../src/generators';
import { Level, SolveOrGenerate } from '../src/types';
import { configuredGithubStrategy } from '../src/auth';
import passport from 'passport';

passport.use(configuredGithubStrategy);

const app = express();
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj as Express.User);
});

const createPrefixedPath = (path = '') => `/api/${path}`;

app.get(createPrefixedPath('user'), passport.authenticate('github'), (req, res) => {
  return res.end(req.user);
});
// default to level 0 for both
app.get(createPrefixedPath('solve/:user'), async (req, res) => {
  return res.redirect(createPrefixedPath(`solve/${req.params.user}/0`));
});

app.get(createPrefixedPath('generate/:user'), async (req, res) => {
  return res.redirect(createPrefixedPath(`generate/${req.params.user}/0`));
});

const defaultHandler = async (req: Request, res: Response, requestType: SolveOrGenerate) => {
  if (req.params.user == undefined) return res.status(500).end('No user specified');

  const level = Number(req.params.level) as Level;
  try {
    const rtn =
      requestType === 'solve'
        ? await getProblemSolution(req.params.user, level)
        : await retrieveGeneratedData(req.params.user, level);

    return res.end(rtn);
  } catch (err) {
    console.log(err);
    return res.status(500).end('Error, make sure user is valid and level is 0/1/2');
  }
};

app.get(createPrefixedPath('solve/:user/:level'), (req, res) => defaultHandler(req, res, 'solve'));
app.get(createPrefixedPath('generate/:user/:level'), (req, res) =>
  defaultHandler(req, res, 'generate'),
);

export default app;
