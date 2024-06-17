import playwright, { BrowserContext } from 'playwright-core';
import {
  CHROME,
  DEFAULT_METAMASK_BINARY_PATH,
  DEFAULT_METAMASK_FLASK_BINARY_PATH,
  DEFAULT_RAINBOW_BINARY_PATH,
  DEFAULT_ZERION_BINARY_PATH,
  HTTPS_PROXY_HOST,
  METAMASK,
  METAMASK_FLASK,
  RAINBOW,
  ZERION
} from '../constants';
import { Browser, BrowserOptions } from '../types';

export class PlaywrightFactory {
  async build(browser: Browser, options: BrowserOptions): Promise<BrowserContext> {
    if (browser.toLowerCase() === CHROME) {
      return this.buildChrome(options);
    }
    throw new Error('Unsupported browser: ' + browser);
  }

  private async buildChrome(options: BrowserOptions): Promise<BrowserContext> {
    const chromeOptions: object = {
      headless: false,
      channel: 'chrome',
      args: [],
      viewport: null
    };
    if (options.proxy) {
      chromeOptions['ignoreHTTPSErrors'] = true;
      chromeOptions['proxy'] = {
        server: HTTPS_PROXY_HOST
      };
    }
    if (options.extension.wallet !== null) {
      let extensionPath: string = options.extension.path;
      if (options.extension.wallet === METAMASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_BINARY_PATH;
      } else if (options.extension.wallet === METAMASK_FLASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_FLASK_BINARY_PATH;
      } else if (options.extension.wallet === ZERION) {
        extensionPath = extensionPath || DEFAULT_ZERION_BINARY_PATH;
      } else if (options.extension.wallet === RAINBOW) {
        extensionPath = extensionPath || DEFAULT_RAINBOW_BINARY_PATH;
      }
      chromeOptions['args'].push(`--disable-extensions-except=${extensionPath}`);
      chromeOptions['args'].push(`--load-extension=${extensionPath}`);
    }
    const browserContext: BrowserContext = await playwright.chromium.launchPersistentContext('', chromeOptions);
    return browserContext;
  }
}
