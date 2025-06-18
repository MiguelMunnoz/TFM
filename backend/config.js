const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, 'prod.env')
});

const createTransporter = () => {
  const nodemailer = require('nodemailer');
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

module.exports = {
  PORT: process.env.PORT || 5000,
  
  SECRET_KEY: process.env.SECRET_KEY || 'cotraseña-para-jwc',

  EMAIL_USER: process.env.EMAIL_USER || 'usuarioEmail@gmail.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'genericPass',

  DB_USER: process.env.MONGO_USER || 'usuario-desconocido',
  DB_PASS: process.env.MONGO_PASS || 'contraseña-desconocida',
  DB_NAME: process.env.MONGO_DBNAME || 'DB-NAME',

  createTransporter
};