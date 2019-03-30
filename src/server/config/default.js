const appId = 'GoodPrice';
const appModeDev = process.env.APP_MODE_DEV === '1';
const env = process.env.NODE_ENV || 'localhost';
const host = process.env.HOST || '0.0.0.0';
console.log('appModeDev', appModeDev); // eslint-disable-line
console.log('env', env); // eslint-disable-line
console.log('host', host); // eslint-disable-line

const config = {
  appId,
  appModeDev,
  env,
  basePath: '',

  buildConfig: {
    targetDir: '.build',
    assetsDir: 'assets'
  },

  proxyAssets: {
    host: 'localhost',
    port: process.env.PORT_PROXY || 9090
  },

  server: {
    host,
    port: process.env.PORT || 3000
  }
};


export default config;
