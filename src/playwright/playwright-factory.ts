import playwright, { BrowserContext } from 'playwright-core';
import { CHROME, HEADLESS, HTTPS_PROXY_HOST } from '../constants';
import { logInfo } from '../log';
import { Browser, BrowserOptions } from '../types';

export class PlaywrightFactory {
  async build(browser: Browser, options: BrowserOptions): Promise<BrowserContext> {
    if (browser.toLowerCase() === CHROME) {
      return await this.buildChrome(options);
    }
    throw new Error('Unsupported browser: ' + browser);
  }

  private async buildChrome(options: BrowserOptions): Promise<BrowserContext> {
    const chromeOptions: object = {
      headless: false,
      channel: 'chrome',
      args: []
    };
    if (options.proxy) {
      chromeOptions['ignoreHTTPSErrors'] = true;
      chromeOptions['proxy'] = {
        server: HTTPS_PROXY_HOST
      };
    }
    if (options.extension.wallet !== null && options.extension.wallet !== HEADLESS) {
      const extensionPath: string = options.extension.path;
      logInfo(`Loading extension from path: ${extensionPath}`);
      chromeOptions['args'].push(`--disable-extensions-except=${extensionPath}`);
      chromeOptions['args'].push(`--load-extension=${extensionPath}`);
    }
    chromeOptions['args'].push(`--window-size=1024,768`);
    const browserContext: BrowserContext = await playwright.chromium.launchPersistentContext('', chromeOptions);
    return browserContext;
  }
}
