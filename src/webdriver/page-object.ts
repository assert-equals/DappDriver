import { WebDriver, until } from 'selenium-webdriver';
import { DappDriver } from '../session/dapp-driver';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { METAMASK } from '../constants';

export class WebDriverPageObject implements IPageObject {
  private driver: WebDriver;

  constructor() {
    this.driver = DappDriver.Instance.Driver as WebDriver;
  }

  async back(): Promise<void> {
    await this.driver.navigate().back();
  }

  async backToPage<TPage>(page: new () => TPage): Promise<TPage> {
    await this.back();
    return DappDriver.getPage(page);
  }

  async close(): Promise<void> {
    await this.driver.close();
  }

  async closeAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage> {
    await this.close();
    return this.switchToMainWindow<TPage>(page);
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
    page: new () => TPage,
  ): Promise<TPage> {
    this.driver.executeScript(script);
    return this.opensInExtension<TPage>(page);
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

  async navigateTo(url: string): Promise<void> {
    await this.driver.navigate().to(url);
  }

  async navigateToPage<TPage>(url: string, page: new () => TPage): Promise<TPage> {
    await this.navigateTo(url);
    return DappDriver.getPage(page);
  }

  async navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage> {
    await this.createNewWindow();
    return this.navigateToPage<TPage>(url, page);
  }

  async opensInExtension<TPage extends IConfirmation>(page: new () => TPage): Promise<TPage> {
    // Account for the the offscreen document in MetaMask (MV3): 'MetaMask Offscreen Page'
    const expectedHandles: number = DappDriver.Instance.Wallet === METAMASK ? 3 : 2;
    const extension: number = expectedHandles - 1;
    const handles: Array<string> = await this.waitForWindows(expectedHandles);
    return this.switchToWindow<TPage>(handles[extension], page);
  }

  async opensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handles: Array<string> = await this.waitForWindows(2);
    await this.switchToWindow(handles[1]);
    if (page) {
      return DappDriver.getPage(page);
    }
  }

  async refresh(): Promise<void> {
    await this.driver.navigate().refresh();
  }

  async refreshPage<TPage>(page: new () => TPage): Promise<TPage> {
    await this.refresh();
    return DappDriver.getPage(page);
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
      return DappDriver.getPage(page);
    }
  }

  async switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any> {
    await this.driver.switchTo().window(nameOrHandle);
    if (page) {
      return DappDriver.getPage(page);
    }
  }

  async waitForElement(cssLocator: string): Promise<void> {
    await this.driver.wait(until.elementLocated({ css: cssLocator }), 20000);
  }

  async waitForTitle(title: RegExp): Promise<void> {
    await this.driver.wait(until.titleMatches(title), 10000);
  }

  async waitForURL(url: RegExp): Promise<void> {
    await this.driver.wait(until.urlMatches(url), 10000);
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
