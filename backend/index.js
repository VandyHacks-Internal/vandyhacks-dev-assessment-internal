if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { parse } = require('url');
const { retrieveGeneratedData } = require('./retrieve');

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    // console.log(query);
    let { user, level } = query;

    level = Number(level);
    if (level !== 0 && level !== 1 && level !== 2) throw new Error('Invalid level');

    const problemInputText = await retrieveGeneratedData(user.toLowerCase(), level);
    res.status(200).end(problemInputText);
  } catch (err) {
    res.status(401).end('Make sure your GitHub username is correctly entered.');
  }
};
