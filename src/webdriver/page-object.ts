import { WebDriver, until } from 'selenium-webdriver';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { DappDriver } from '../session/dapp-driver';
import { Comparator, Cookie } from '../types';
import { isAtLeast, isAtMost, toRegExp } from '../utils';

export class WebDriverPageObject implements IPageObject {
  private driver: WebDriver;
  public url: string | RegExp;
  public title: string;

  constructor() {
    this.driver = DappDriver.Instance.Driver as WebDriver;
  }

  async addCookie(cookie: Cookie): Promise<void> {
    return await this.driver.manage().addCookie(cookie);
  }

  async back<TPage>(page: new () => TPage): Promise<TPage> {
    await this.driver.navigate().back();
    return await DappDriver.getPage<TPage>(page);
  }

  async clearCookie(name: string): Promise<void> {
    return await this.driver.manage().deleteCookie(name);
  }

  async clearCookies(): Promise<void> {
    return await this.driver.manage().deleteAllCookies();
  }

  async close<TPage>(page: new () => TPage): Promise<TPage> {
    await this.driver.close();
    return await DappDriver.getPage<TPage>(page);
  }

  async closeAndSwitchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    const windowHandles: Array<string> = await this.getAllWindowHandles();
    await this.driver.close();
    return await this.waitAndSwitchToWindow(page, windowHandles.length - 1, isAtMost);
  }

  async executeScript(script: string): Promise<any> {
    script = script.startsWith('return ') ? script : ''.concat('return ', script);
    return await this.driver.executeScript(script);
  }

  async executeScriptAndSwitchToWindow<TPage extends IConfirmation | IPageObject>(
    script: string,
    page: new () => TPage
  ): Promise<any> {
    this.driver.executeScript(script);
    return await this.waitAndSwitchToWindow(page);
  }

  async forward<TPage>(page: new () => TPage): Promise<TPage> {
    await this.driver.navigate().forward();
    return await DappDriver.getPage<TPage>(page);
  }

  async getAllWindowHandles(): Promise<Array<string>> {
    return await this.driver.getAllWindowHandles();
  }

  async getCookie(name: string): Promise<any> {
    let cookie = null;
    try {
      cookie = await this.driver.manage().getCookie(name);
    } catch (e) {}
    return cookie;
  }

  async getCookies(): Promise<Array<any>> {
    return await this.driver.manage().getCookies();
  }

  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  async getPageSource(): Promise<string> {
    return await this.driver.getPageSource();
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

  async navigateTo<TPage>(url: string, page: new () => TPage): Promise<TPage> {
    await this.driver.navigate().to(url);
    return await DappDriver.getPage<TPage>(page);
  }

  async navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage> {
    await this.driver.switchTo().newWindow('tab');
    const windowHandles: Array<string> = await this.getAllWindowHandles();
    await this.driver.switchTo().window(windowHandles.at(-1));
    return await this.navigateTo<TPage>(url, page);
  }

  async refresh<TPage>(page: new () => TPage): Promise<TPage> {
    await this.driver.navigate().refresh();
    return await DappDriver.getPage<TPage>(page);
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

  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    const delay: number = 1000;
    const retries: number = 60;
    for (let attempt = 1; attempt <= retries; attempt++) {
      const windowHandles: Array<string> = await this.getAllWindowHandles();
      for (const handle of windowHandles) {
        try {
          await this.driver.switchTo().window(handle);
          const actualTitle: string = await this.getTitle();
          const actualUrl: string = await this.getCurrentUrl();
          const newPage: TPage = new page();
          const title: RegExp = toRegExp(newPage.title);
          const url: RegExp = toRegExp(newPage.url);
          if (RegExp(title).exec(actualTitle) !== null && RegExp(url).exec(actualUrl) !== null) {
            return await DappDriver.getPage<TPage>(page);
          }
        } catch (e) {}
      }
      await DappDriver.sleep(delay);
    }
    throw new Error('switchToMatchingWindow timed out finding a matching window');
  }

  async waitAndSwitchToWindow<TPage extends IConfirmation | IPageObject>(
    page: new () => TPage,
    total: number = 2,
    comparator: Comparator = isAtLeast
  ): Promise<TPage> {
    await this.waitForWindows(total, comparator);
    return await this.switchToWindow(page);
  }

  async waitForElement(cssLocator: string): Promise<void> {
    await this.driver.wait(until.elementLocated({ css: cssLocator }), 20000);
  }

  async waitForTitle(title: RegExp): Promise<void> {
    await this.driver.wait(until.titleMatches(title), 20000);
  }

  async waitForURL(url: RegExp): Promise<void> {
    await this.driver.wait(until.urlMatches(url), 20000);
  }

  async waitForWindows(total: number, comparator: Comparator): Promise<void> {
    const delay: number = 1000;
    const retries: number = 10;
    for (let attempt = 1; attempt <= retries; attempt++) {
      const windowHandles: Array<string> = await this.getAllWindowHandles();
      if (comparator(windowHandles.length, total)) return;
      await DappDriver.sleep(delay);
    }
    throw new Error('waitForWindows timed out polling window handles');
  }
}
