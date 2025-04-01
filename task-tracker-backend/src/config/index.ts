import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
