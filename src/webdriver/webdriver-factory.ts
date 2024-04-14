import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Browser, WalletOptions } from '../types';
import {
  CHROME,
  DEFAULT_METAMASK_BINARY_PATH,
  DEFAULT_METAMASK_FLASK_BINARY_PATH,
  DEFAULT_ZERION_BINARY_PATH,
  METAMASK,
  METAMASK_FLASK,
  ZERION,
} from '../constants';

export class WebDriverFactory {
  build(browser: Browser, walletOptions: WalletOptions): Promise<WebDriver> {
    switch (browser.toLowerCase()) {
      case CHROME:
        return this.buildChrome(walletOptions);
      default:
        throw new Error('Unsupported browser: ' + browser);
    }
  }

  private async buildChrome(walletOptions: WalletOptions): Promise<WebDriver> {
    const chromeOptions: ChromeOptions = new ChromeOptions();
    const args: Array<string> = [];
    if (walletOptions.wallet !== null) {
      let extensionPath: string = walletOptions.path;
      if (walletOptions.wallet === METAMASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_BINARY_PATH;
      } else if (walletOptions.wallet === METAMASK_FLASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_FLASK_BINARY_PATH;
      } else if (walletOptions.wallet === ZERION) {
        extensionPath = extensionPath || DEFAULT_ZERION_BINARY_PATH;
      }
      args.push(`--load-extension=${extensionPath}`);
    }
    chromeOptions.addArguments(...args);
    const driver: WebDriver = await new Builder().forBrowser(CHROME).setChromeOptions(chromeOptions).build();
    await driver.manage().setTimeouts({ implicit: 20000 });
    return driver;
  }
}
