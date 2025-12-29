import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_SSL: process.env.DB_SSL,
};

const redisConfig = {
  REDISURL : process.env.REDISURL
}

export { dbConfig };