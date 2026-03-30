import pkg from '../../package.json';
import { Browser, Framework } from '../types';

export const PACKAGE_NAME: string = pkg.name;
export const NODE_MODULE_DIR: string = `node_modules/${PACKAGE_NAME}`;
export const CHROME: Browser = 'chrome';
export const PROXY_PORT: number = 8000;
export const HTTPS_PROXY_HOST: string = `127.0.0.1:${PROXY_PORT}`;
export const PLAYWRIGHT: Framework = 'playwright';
export const WEBDRIVER: Framework = 'webdriver';
