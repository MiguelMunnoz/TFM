const path = require('path');
const dotenv = require('dotenv');

// Detectar entorno actual (por defecto, "development")
const NODE_ENV = process.env.NODE_ENV || 'development';

// Cargar archivo `.env` solo si no estás en producción
if (NODE_ENV !== 'prod') {
  const envFile = NODE_ENV === 'test' ? '.env.test' : '.env'; // puedes añadir más entornos si quieres
  dotenv.config({ path: path.resolve(__dirname, envFile) });
  console.log(`[INFO] Loading variables from ${envFile}`);
} else {
  console.log('[INFO] Using env variables');
}

// Exportar configuración
const config = {
  NODE_ENV,
  PORT: process.env.PORT || 5000,

  SECRET_KEY: process.env.SECRET_KEY || 'fallback-secret-key',

  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',

  DB_USER: process.env.MONGO_USER || '',
  DB_PASS: process.env.MONGO_PASS || '',
  DB_NAME: process.env.MONGO_DBNAME || '',

  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',

  createTransporter: () => {
    const nodemailer = require('nodemailer');
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
};

module.exports = config;
