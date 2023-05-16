require('dotenv').config();

module.exports = {
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  BASE_URL: process.env.BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URL: process.env.MONGODB_URL
}