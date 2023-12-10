const PROXY_CONFIG = {
    '/': {
      target: 'https://172.20.10.3:5000',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
    },
  };

module.exports = PROXY_CONFIG;
