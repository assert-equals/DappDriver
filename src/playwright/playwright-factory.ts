import playwright, { BrowserContext } from 'playwright-core';
import { Browser, WalletOptions } from '../types';
import { CHROME, DEFAULT_METAMASK_BINARY_PATH, DEFAULT_ZERION_BINARY_PATH, METAMASK, ZERION } from '../constants';

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
    const chromeOptions: object = {
      headless: false,
      channel: 'chrome',
      args: [],
      viewport: null,
    };
    if (walletOptions.wallet !== null) {
      let extensionPath: string = walletOptions.path;
      if (walletOptions.wallet === METAMASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_BINARY_PATH;
      } else if (walletOptions.wallet === ZERION) {
        extensionPath = extensionPath || DEFAULT_ZERION_BINARY_PATH;
      }
      chromeOptions['args'].push(`--disable-extensions-except=${extensionPath}`);
      chromeOptions['args'].push(`--load-extension=${extensionPath}`);
    }
    const browserContext: BrowserContext = await playwright.chromium.launchPersistentContext('', chromeOptions);
    return browserContext;
  }
}
