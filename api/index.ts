import express from 'express';
import generateRouter from '../src/generators/router';
import solveRouter from '../src/solvers/router';

const app = express();
const createPrefixedPath = (path = '') => `/api/${path}`;

app.use(createPrefixedPath('generate/'), generateRouter);
app.use(createPrefixedPath('solve/'), solveRouter);

export default app;
