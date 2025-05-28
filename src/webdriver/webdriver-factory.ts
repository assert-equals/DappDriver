import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { CHROME, HEADLESS, HTTPS_PROXY_HOST } from '../constants';
import { logInfo } from '../log';
import { Browser, BrowserOptions } from '../types';

export class WebDriverFactory {
  async build(browser: Browser, options: BrowserOptions): Promise<WebDriver> {
    if (browser.toLowerCase() === CHROME) {
      return await this.buildChrome(options);
    }
    throw new Error('Unsupported browser: ' + browser);
  }

  private async buildChrome(options: BrowserOptions): Promise<WebDriver> {
    const chromeOptions: ChromeOptions = new ChromeOptions();
    const args: Array<string> = [];
    if (options.proxy) {
      args.push(`--proxy-server=${HTTPS_PROXY_HOST}`);
      chromeOptions.setAcceptInsecureCerts(true);
    }
    if (options.extension.wallet !== null && options.extension.wallet !== HEADLESS) {
      const extensionPath: string = options.extension.path;
      logInfo(`Loading extension from path: ${extensionPath}`);
      args.push(`--load-extension=${extensionPath}`);
    }
    if (options.extension.wallet === HEADLESS) {
      chromeOptions.enableBidi();
    }
    args.push(`--window-size=1024,768`);
    chromeOptions.addArguments(...args);
    chromeOptions.setBrowserVersion('135.0.7049.114');
    const driver: WebDriver = await new Builder().forBrowser(CHROME).setChromeOptions(chromeOptions).build();
    await driver.manage().setTimeouts({ implicit: 20000 });
    return driver;
  }
}
