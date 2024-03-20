import playwright, { BrowserContext } from 'playwright-core';
import { Browser, WalletOptions } from '../types';
import { CHROME, DEFAULT_BINARY_PATH, METAMASK } from '../constants';

export class PlaywrightFactory {
  async build(browser: Browser, walletOptions: WalletOptions): Promise<BrowserContext> {
    switch (browser.toLowerCase()) {
      case CHROME:
        return this.buildChrome(walletOptions);
      default:
        throw new Error('Unsupported browser: ' + browser);
    }
  }

  private async buildChrome(walletOptions: WalletOptions): Promise<BrowserContext> {
    const options: object = {
      headless: false,
      channel: 'chrome',
      args: [],
      viewport: null,
    };
    if (walletOptions.wallet === METAMASK) {
      const extensionPath: string = walletOptions.path || `${process.cwd()}/${DEFAULT_BINARY_PATH}`;
      options['args'].push(`--disable-extensions-except=${extensionPath}`);
      options['args'].push(`--load-extension=${extensionPath}`);
    }
    const browserContext: BrowserContext = await playwright.chromium.launchPersistentContext('', options);
    return browserContext;
  }
}
