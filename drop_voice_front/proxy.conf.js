import { environment } from 'src/environments/environment';

const PROXY_CONFIG = {
  '/': {
    target: environment.apiUrl,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONFIG;
