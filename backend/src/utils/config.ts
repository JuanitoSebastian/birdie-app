import dotenv from 'dotenv';

dotenv.config();

interface ENV {
  PORT?: string;
  BIRDNEST_API_URL?: string;
}

interface Config {
  PORT: string;
  BIRDNEST_API_URL: string;
}

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT,
    BIRDNEST_API_URL: process.env.BIRDNEST_API_URL
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;