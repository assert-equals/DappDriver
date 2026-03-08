import { BrowserContext } from 'playwright-core';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';
import { Comparator, Cookie, Frame, Page } from '../types';
import { isAtLeast, isAtMost, toRegExp } from '../utils';

export class PlaywrightPageObject implements IPageObject {
  private page: Page;
  private driver: BrowserContext;
  private pageObject: PageObject;
  public url: string | RegExp;
  public title: string;

  constructor(page: Page) {
    this.initialize(page);
    this.driver = DappDriver.Instance.Driver as BrowserContext;
    this.pageObject = new PageObject();
  }

  initialize(page: Page): void {
    this.page = page;
    DappDriver.Instance.Page = this.page;
  }

  async addCookie(cookie: Cookie): Promise<void> {
    return await this.driver.addCookies([cookie]);
  }

  async back<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.goBack();
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async clearCookie(name: string): Promise<void> {
    return await this.driver.clearCookies({ name });
  }

  async clearCookies(): Promise<void> {
    return await this.driver.clearCookies();
  }

  async close<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.close();
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async closeAndSwitchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    const windowHandles: Array<Page> = await this.getAllWindowHandles();
    await this.close();
    return await this.waitForWindows(windowHandles.length - 1, isAtMost, page);
  }

  async executeScript(script: string): Promise<any> {
    return await this.page.evaluate(script);
  }

  async executeScriptAndOpensInWindow<TPage extends IConfirmation | IPageObject>(
    script: string,
    page: new () => TPage
  ): Promise<any> {
    this.page.evaluate(script);
    return await this.opensInWindow(page);
  }

  async forward<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.goForward();
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async getAllWindowHandles(): Promise<Array<Page>> {
    return await Promise.resolve(this.driver.pages());
  }

  async getCookie(name: string): Promise<any> {
    const url: string = await this.getCurrentUrl();
    const origin: string = new URL(url).origin;
    const cookies = await this.driver.cookies(origin);
    const [cookie] = cookies.filter((cookie) => cookie.name === name);
    return cookie || null;
  }

  async getCookies(): Promise<any> {
    const url: string = await this.getCurrentUrl();
    const origin: string = new URL(url).origin;
    return await this.driver.cookies(origin);
  }

  async getCurrentUrl(): Promise<string> {
    return await Promise.resolve(this.page.url());
  }

  async getPageSource(): Promise<string> {
    return await this.page.content();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getWindowHandle(): Promise<Page> {
    return await Promise.resolve(this.page);
  }

  async maximize(): Promise<void> {
    const { width, height } = await this.executeScript('window.screen');
    await this.page.setViewportSize({ width, height });
  }

  async navigateTo<TPage>(url: string, page?: new () => TPage): Promise<any> {
    await this.page.goto(url);
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async navigateToPageInNewWindow<TPage>(url: string, page?: new () => TPage): Promise<any> {
    await this.driver.newPage();
    const windowHandles: Array<Page> = await this.getAllWindowHandles();
    await this.switchToWindow(windowHandles.at(-1), page);
    await this.navigateTo(url);
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async opensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.waitForWindows(2, isAtLeast, page);
  }

  async refresh<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.reload();
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async setSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async switchBack(): Promise<void> {
    DappDriver.Instance.Frame = null;
  }

  async switchToFrame(cssLocator: string): Promise<void> {
    const frame: Frame = this.page.frameLocator(cssLocator);
    DappDriver.Instance.Frame = frame;
  }

  async switchToWindow<TPage>(nameOrHandle: Page, page?: new () => TPage): Promise<any> {
    this.initialize(nameOrHandle);
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async waitForElement(cssLocator: string): Promise<void> {
    await this.pageObject.waitForFunction(
      async () => (await this.page.locator(cssLocator).count()) > 0,
      `Waiting for element to be located ${cssLocator}`
    );
  }

  async waitForTitle(title: RegExp): Promise<void> {
    await this.pageObject.waitForFunction(
      async () => RegExp(title).exec(await this.getTitle()) !== null,
      `Waiting for title to match ${title}`,
      20000
    );
  }

  async waitForURL(url: RegExp): Promise<void> {
    await this.pageObject.waitForFunction(
      async () => RegExp(url).exec(await this.getCurrentUrl()) !== null,
      `Waiting for url to match ${url}`,
      20000
    );
  }

  async waitForWindows<TPage extends IConfirmation | IPageObject>(
    total: number,
    comparator: Comparator,
    page: new () => TPage
  ): Promise<TPage> {
    const delay: number = 1000;
    const retries: number = 60;
    let windowHandles: Array<Page> = [];
    for (let attempt = 1; attempt <= retries; attempt++) {
      windowHandles = await this.getAllWindowHandles();
      if (comparator(windowHandles.length, total)) {
        for (const handle of windowHandles) {
          try {
            await this.switchToWindow(handle);
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
      }
      await DappDriver.sleep(delay);
    }
    throw new Error('waitForWindows timed out polling window handles');
  }
}
