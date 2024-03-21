import pkg from '../../package.json';
import { Browser, Framework, Wallet } from '../types';

const PACKAGE_NAME: string = pkg.name;
const PACKAGE_VERSION: string = pkg.version;
const DEFAULT_CHANNEL: string = 'metamask-chrome';
const DEFAULT_VERSION: string = '11.10.1';
const RECOMMENDED_VERSIONS: string = '>=11.10.0 <11.13.0';
const NODE_MODULE_DIR: string = `node_modules/${PACKAGE_NAME}`;
const DEFAULT_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_CHANNEL}-${DEFAULT_VERSION}`;
const METAMASK: Wallet = 'metamask';
const PLAYWRIGHT: Framework = 'playwright';
const WEBDRIVER: Framework = 'webdriver';
const CHROME: Browser = 'chrome';

export {
  DEFAULT_BINARY_PATH,
  DEFAULT_CHANNEL,
  DEFAULT_VERSION,
  NODE_MODULE_DIR,
  PACKAGE_NAME,
  PACKAGE_VERSION,
  RECOMMENDED_VERSIONS,
  METAMASK,
  PLAYWRIGHT,
  WEBDRIVER,
  CHROME,
};
