const PROXY_CONFIG = {
    '/': {
      target: 'https://172.20.10.3:5000',
      secure: false,
      changeOrigin: true,
    },
  };
  
module.exports = PROXY_CONFIG;
