import { WebDriver, until } from 'selenium-webdriver';
import { DappDriver } from '../session/dapp-driver';
import { IPageObject } from '../interface/page-object';
import { PageObject } from '../page';

export class WebDriverPageObject implements IPageObject {
  private driver: WebDriver;

  constructor() {
    this.driver = DappDriver.Instance.Driver as WebDriver;
  }

  async back(): Promise<void> {
    await this.driver.navigate().back();
  }

  async backToPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.back();
    return DappDriver.getPage(page);
  }

  async close(): Promise<void> {
    await this.driver.close();
  }

  async closeAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.close();
    await this.switchToMainWindow();
    return DappDriver.getPage(page);
  }

  async createNewWindow(): Promise<void> {
    await this.driver.switchTo().newWindow('tab');
    await this.opensInNewWindow();
  }

  async executeScript(script: string): Promise<any> {
    script = script.startsWith('return ') ? script : ''.concat('return ', script);
    return await this.driver.executeScript(script);
  }

  async executeScriptAndOpensInNewWindow<TPage extends PageObject>(
    script: string,
    page: new () => TPage,
  ): Promise<TPage> {
    this.driver.executeScript(script);
    await this.opensInNewWindow();
    return DappDriver.getPage(page);
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

  async navigateToPage<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage> {
    await this.navigateTo(url);
    return DappDriver.getPage(page);
  }

  async navigateToPageInNewWindow<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage> {
    await this.createNewWindow();
    return this.navigateToPage<TPage>(url, page);
  }

  async opensInNewWindow(): Promise<void> {
    const handles: Array<string> = await this.waitForWindows(2);
    await this.switchToWindow(handles[1]);
  }

  async refresh(): Promise<void> {
    await this.driver.navigate().refresh();
  }

  async refreshPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
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

  async switchToMainWindow(): Promise<void> {
    const handles: Array<string> = await this.waitForWindows(1);
    await this.switchToWindow(handles[0]);
  }

  async switchToWindow(nameOrHandle: any): Promise<void> {
    return await this.driver.switchTo().window(nameOrHandle);
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
