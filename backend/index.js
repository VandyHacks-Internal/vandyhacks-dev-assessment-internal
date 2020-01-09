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
    res.end(problemInputText);
  } catch (err) {
    res.end(
      err +
        "\nError! Make sure you are entering your GitHub username exactly correctly. If you're still having issues, please contact VandyHacks.",
    );
  }
};
