const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, 'dev.env')
});

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME || 'testing'
};