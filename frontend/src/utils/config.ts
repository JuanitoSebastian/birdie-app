interface ENV {
  REACT_APP_API_URL?: string;
}

interface Config {
  REACT_APP_API_URL: string
}

const getConfig = (): ENV => {
  return {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL
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