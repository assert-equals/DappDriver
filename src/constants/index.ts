import pkg from '../../package.json';
import { Browser, Framework, Wallet } from '../types';
import { Range } from 'semver';

const PACKAGE_NAME: string = pkg.name;
const PACKAGE_VERSION: string = pkg.version;
const DEFAULT_METAMASK_ASSET: string = 'metamask-chrome';
const DEFAULT_METAMASK_FLASK_ASSET: string = 'metamask-flask-chrome';
const DEFAULT_RAINBOW_ASSET: string = 'rainbowbx-chrome';
const DEFAULT_ZERION_ASSET: string = 'zerion-wallet-extension';
const DEFAULT_METAMASK_VERSION: string = '11.16.7';
const DEFAULT_METAMASK_FLASK_VERSION: string = '11.16.7';
const DEFAULT_RAINBOW_VERSION: string = '1.4.97';
const DEFAULT_ZERION_VERSION: string = '1.5.0';
const RECOMMENDED_METAMASK_VERSIONS: Range = new Range('>=11.16.0 <11.17.0');
const RECOMMENDED_METAMASK_FLASK_VERSIONS: Range = new Range('>=11.16.0 <11.17.0');
const RECOMMENDED_RAINBOW_VERSIONS: Range = new Range('>=1.4.97 <1.5.0');
const RECOMMENDED_ZERION_VERSIONS: Range = new Range('>=1.5.0 <1.6.0');
const METAMASK_GITHUB_API: string = 'https://api.github.com/repos/metamask/metamask-extension';
const RAINBOW_GITHUB_API: string = 'https://api.github.com/repos/rainbow-me/browser-extension';
const ZERION_GITHUB_API: string = 'https://api.github.com/repos/zeriontech/zerion-wallet-extension';
const NODE_MODULE_DIR: string = `node_modules/${PACKAGE_NAME}`;
const DEFAULT_METAMASK_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_METAMASK_ASSET}-${DEFAULT_METAMASK_VERSION}`;
const DEFAULT_METAMASK_FLASK_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_METAMASK_FLASK_ASSET}-${DEFAULT_METAMASK_FLASK_VERSION}-flask.0`;
const DEFAULT_RAINBOW_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_RAINBOW_ASSET}-v${DEFAULT_RAINBOW_VERSION}`;
const DEFAULT_ZERION_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_ZERION_ASSET}-v${DEFAULT_ZERION_VERSION}`;
const METAMASK: Wallet = 'metamask';
const METAMASK_FLASK: Wallet = 'metamask-flask';
const RAINBOW: Wallet = 'rainbow';
const ZERION: Wallet = 'zerion';
const PLAYWRIGHT: Framework = 'playwright';
const WEBDRIVER: Framework = 'webdriver';
const CHROME: Browser = 'chrome';
const PROXY_PORT: number = 8000;
const HTTPS_PROXY_HOST: string = `127.0.0.1:${PROXY_PORT}`;

export {
  DEFAULT_METAMASK_BINARY_PATH,
  DEFAULT_METAMASK_FLASK_BINARY_PATH,
  DEFAULT_RAINBOW_BINARY_PATH,
  DEFAULT_ZERION_BINARY_PATH,
  DEFAULT_METAMASK_ASSET,
  DEFAULT_METAMASK_FLASK_ASSET,
  DEFAULT_ZERION_ASSET,
  DEFAULT_METAMASK_VERSION,
  DEFAULT_METAMASK_FLASK_VERSION,
  DEFAULT_RAINBOW_VERSION,
  DEFAULT_ZERION_VERSION,
  METAMASK_GITHUB_API,
  RAINBOW_GITHUB_API,
  ZERION_GITHUB_API,
  NODE_MODULE_DIR,
  PACKAGE_NAME,
  PACKAGE_VERSION,
  RECOMMENDED_METAMASK_VERSIONS,
  RECOMMENDED_METAMASK_FLASK_VERSIONS,
  RECOMMENDED_RAINBOW_VERSIONS,
  RECOMMENDED_ZERION_VERSIONS,
  METAMASK,
  METAMASK_FLASK,
  RAINBOW,
  ZERION,
  PLAYWRIGHT,
  WEBDRIVER,
  CHROME,
  PROXY_PORT,
  HTTPS_PROXY_HOST,
};
