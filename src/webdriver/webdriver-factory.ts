import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Browser, BrowserOptions } from '../types';
import {
  CHROME,
  DEFAULT_METAMASK_BINARY_PATH,
  DEFAULT_METAMASK_FLASK_BINARY_PATH,
  DEFAULT_ZERION_BINARY_PATH,
  HTTPS_PROXY_HOST,
  METAMASK,
  METAMASK_FLASK,
  ZERION,
} from '../constants';

export class WebDriverFactory {
  build(browser: Browser, options: BrowserOptions): Promise<WebDriver> {
    switch (browser.toLowerCase()) {
      case CHROME:
        return this.buildChrome(options);
      default:
        throw new Error('Unsupported browser: ' + browser);
    }
  }

  private async buildChrome(options: BrowserOptions): Promise<WebDriver> {
    const chromeOptions: ChromeOptions = new ChromeOptions();
    const args: Array<string> = [];
    if (options.proxy) {
      args.push(`--proxy-server=${HTTPS_PROXY_HOST}`);
      chromeOptions.setAcceptInsecureCerts(true);
    }
    if (options.extension.wallet !== null) {
      let extensionPath: string = options.extension.path;
      if (options.extension.wallet === METAMASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_BINARY_PATH;
      } else if (options.extension.wallet === METAMASK_FLASK) {
        extensionPath = extensionPath || DEFAULT_METAMASK_FLASK_BINARY_PATH;
      } else if (options.extension.wallet === ZERION) {
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
