import { WebDriver, until } from 'selenium-webdriver';
import { METAMASK } from '../constants';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { DappDriver } from '../session/dapp-driver';

export class WebDriverPageObject implements IPageObject {
  private driver: WebDriver;
  public url: string | RegExp;
  public title: string;

  constructor() {
    this.driver = DappDriver.Instance.Driver as WebDriver;
  }

  async back<TPage>(page?: new () => TPage): Promise<any> {
    await this.driver.navigate().back();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async close<TPage>(page?: new () => TPage): Promise<any> {
    await this.driver.close();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async closeAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    await this.close();
    await this.switchToMainWindow();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async createNewWindow(): Promise<void> {
    await this.driver.switchTo().newWindow('tab');
    await this.opensInNewWindow();
  }

  async executeScript(script: string): Promise<any> {
    script = script.startsWith('return ') ? script : ''.concat('return ', script);
    return await this.driver.executeScript(script);
  }

  async executeScriptAndOpensInExtension<TPage extends IConfirmation>(
    script: string,
    page?: new () => TPage
  ): Promise<any> {
    this.driver.executeScript(script);
    await this.opensInExtension();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async getAllWindowHandles(): Promise<Array<string>> {
    return await this.driver.getAllWindowHandles();
  }

  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  async getTitle(): Promise<string> {
    return await this.driver.getTitle();
  }

  async getWindowHandle(): Promise<string> {
    return await this.driver.getWindowHandle();
  }

  async maximize(): Promise<void> {
    await this.driver.manage().window().maximize();
  }

  async navigateTo<TPage>(url: string, page?: new () => TPage): Promise<any> {
    await this.driver.navigate().to(url);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async navigateToPageInNewWindow<TPage>(url: string, page?: new () => TPage): Promise<any> {
    await this.createNewWindow();
    await this.navigateTo(url);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async opensInExtension<TPage extends IConfirmation>(
    page?: new () => TPage,
    url?: RegExp,
    title?: RegExp
  ): Promise<any> {
    const delay: number = 1000;
    const retries: number = 10;
    for (let attempt = 1; attempt <= retries; attempt++) {
      const windowHandles = await this.getAllWindowHandles();
      await this.switchToWindow(windowHandles[0]);
      const extension: string = await this.waitForExtension();
      await this.switchToWindow(extension);
      if (!page) {
        return;
      } else {
        const actualTitle: string = await this.getTitle();
        const actualUrl: string = await this.getCurrentUrl();
        if (RegExp(title).exec(actualTitle) !== null && RegExp(url).exec(actualUrl) !== null) {
          return DappDriver.getPage<TPage>(page);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async opensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handles: Array<string> = await this.waitForWindows(2);
    await this.switchToWindow(handles[1]);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async refresh<TPage>(page?: new () => TPage): Promise<any> {
    await this.driver.navigate().refresh();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async setSize(width: number, height: number): Promise<void> {
    await this.driver.manage().window().setSize(width, height);
  }

  async switchBack(): Promise<void> {
    return await this.driver.switchTo().defaultContent();
  }

  async switchToFrame(cssLocator: string): Promise<void> {
    const frameElement = await this.driver.findElement({ css: cssLocator });
    return await this.driver.switchTo().frame(frameElement);
  }

  async switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handles: Array<string> = await this.getAllWindowHandles();
    await this.switchToWindow(handles[0]);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async switchToWindow<TPage>(nameOrHandle: string, page?: new () => TPage): Promise<any> {
    await this.driver.switchTo().window(nameOrHandle);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async waitForElement(cssLocator: string): Promise<void> {
    await this.driver.wait(until.elementLocated({ css: cssLocator }), 20000);
  }

  async waitForExtension(): Promise<string> {
    // Account for the the offscreen document in MetaMask (MV3): 'MetaMask Offscreen Page'
    const expectedHandles: number = DappDriver.Instance.Wallet === METAMASK ? 3 : 2;
    const extension: number = expectedHandles - 1;
    const handles: Array<string> = await this.waitForWindows(expectedHandles);
    return handles[extension];
  }

  async waitForTitle(title: RegExp): Promise<void> {
    await this.driver.wait(until.titleMatches(title), 10000);
  }

  async waitForURL(url: RegExp): Promise<void> {
    await this.driver.wait(until.urlMatches(url), 20000);
  }

  async waitForWindows(total: number): Promise<Array<string>> {
    const timeout: number = 10_000;
    const delay: number = 100;
    let timeElapsed: number = 0;
    let windowHandles: Array<string> = [];
    while (timeElapsed <= timeout) {
      windowHandles = await this.getAllWindowHandles();
      if (windowHandles.length === total) {
        return windowHandles;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      timeElapsed += delay;
    }
    throw new Error('waitForWindows timed out polling window handles');
  }
}
