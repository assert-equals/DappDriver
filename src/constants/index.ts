import { Range } from 'semver';
import pkg from '../../package.json';
import { Browser, Framework, Wallet } from '../types';

export const PACKAGE_NAME: string = pkg.name;
export const PACKAGE_VERSION: string = pkg.version;
export const DEFAULT_METAMASK_ASSET: string = 'metamask-chrome';
export const DEFAULT_METAMASK_FLASK_ASSET: string = 'metamask-flask-chrome';
const DEFAULT_RAINBOW_ASSET: string = 'rainbowbx-chrome';
export const DEFAULT_ZERION_ASSET: string = 'zerion-wallet-extension';
export const DEFAULT_METAMASK_VERSION: string = '12.17.3';
export const DEFAULT_METAMASK_FLASK_VERSION: string = '12.17.3';
export const DEFAULT_RAINBOW_VERSION: string = '1.5.103';
export const DEFAULT_ZERION_VERSION: string = '1.23.0';
export const RECOMMENDED_METAMASK_VERSIONS: Range = new Range('>=12.17.3 <13.0.0');
export const RECOMMENDED_METAMASK_FLASK_VERSIONS: Range = new Range('>=12.17.3 <13.0.0');
export const RECOMMENDED_RAINBOW_VERSIONS: Range = new Range('>=1.5.103 <1.6.0');
export const RECOMMENDED_ZERION_VERSIONS: Range = new Range('>=1.23.0 <2.0.0');
export const METAMASK_GITHUB_API: string = 'https://api.github.com/repos/metamask/metamask-extension';
export const RAINBOW_GITHUB_API: string = 'https://api.github.com/repos/rainbow-me/browser-extension';
export const ZERION_GITHUB_API: string = 'https://api.github.com/repos/zeriontech/zerion-wallet-extension';
export const NODE_MODULE_DIR: string = `node_modules/${PACKAGE_NAME}`;
export const DEFAULT_METAMASK_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_METAMASK_ASSET}-${DEFAULT_METAMASK_VERSION}`;
export const DEFAULT_METAMASK_FLASK_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_METAMASK_FLASK_ASSET}-${DEFAULT_METAMASK_FLASK_VERSION}-flask.0`;
export const DEFAULT_RAINBOW_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_RAINBOW_ASSET}-v${DEFAULT_RAINBOW_VERSION}`;
export const DEFAULT_ZERION_BINARY_PATH: string = `${process.cwd()}/${NODE_MODULE_DIR}/${DEFAULT_ZERION_ASSET}-v${DEFAULT_ZERION_VERSION}`;
export const HEADLESS: Wallet = 'headless';
export const METAMASK: Wallet = 'metamask';
export const METAMASK_FLASK: Wallet = 'flask';
export const RAINBOW: Wallet = 'rainbow';
export const ZERION: Wallet = 'zerion';
export const PLAYWRIGHT: Framework = 'playwright';
export const WEBDRIVER: Framework = 'webdriver';
export const CHROME: Browser = 'chrome';
export const PROXY_PORT: number = 8000;
export const HTTPS_PROXY_HOST: string = `127.0.0.1:${PROXY_PORT}`;
