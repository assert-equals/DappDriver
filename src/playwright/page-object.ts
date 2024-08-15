import { BrowserContext } from 'playwright-core';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';
import { Comparator, Frame, Page } from '../types';
import { isAtLeast, strictEqual, toRegExp } from '../utils';

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

  async back<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.goBack();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async close<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.close();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async closeAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    await this.close();
    return await this.switchToMainWindow(page);
  }

  async createNewWindow(): Promise<void> {
    await this.driver.newPage();
    await this.opensInNewWindow();
  }

  async executeScript(script: string): Promise<any> {
    return this.page.evaluate(script);
  }

  async executeScriptAndOpensInWindow<TPage extends IConfirmation | IPageObject>(
    script: string,
    page: new () => TPage
  ): Promise<any> {
    this.page.evaluate(script);
    return await this.opensInWindow(page);
  }

  async getAllWindowHandles(): Promise<Array<Page>> {
    return await Promise.resolve(this.driver.pages());
  }

  async getCurrentUrl(): Promise<string> {
    return await Promise.resolve(this.page.url());
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

  async opensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handles: Array<Page> = await this.waitForWindows(2);
    return await this.switchToWindow(handles[1], page);
  }

  async opensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    const delay: number = 1000;
    const retries: number = 10;
    for (let attempt = 1; attempt <= retries; attempt++) {
      const handles: Array<Page> = await this.waitForWindows(2, isAtLeast);
      for (const handle of handles) {
        try {
          await this.switchToWindow(handle);
          const actualTitle: string = await this.getTitle();
          const actualUrl: string = await this.getCurrentUrl();
          const newPage: TPage = new page();
          const title: RegExp = toRegExp(newPage.title);
          const url: RegExp = toRegExp(newPage.url);
          if (RegExp(title).exec(actualTitle) !== null && RegExp(url).exec(actualUrl) !== null) {
            return DappDriver.getPage<TPage>(page);
          }
        } catch (e) {}
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    throw new Error('waitForWindow timed out polling window handles');
  }

  async refresh<TPage>(page?: new () => TPage): Promise<any> {
    await this.page.reload();
    if (page) {
      return DappDriver.getPage<TPage>(page);
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

  async switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handles: Array<Page> = await this.getAllWindowHandles();
    return await this.switchToWindow(handles[0], page);
  }

  async switchToWindow<TPage>(nameOrHandle: Page, page?: new () => TPage): Promise<any> {
    this.initialize(nameOrHandle);
    if (page) {
      return DappDriver.getPage<TPage>(page);
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

  async waitForWindows(total: number, comparator: Comparator = strictEqual): Promise<Array<Page>> {
    const timeout: number = 10_000;
    const delay: number = 100;
    let timeElapsed: number = 0;
    let windowHandles: Array<Page> = [];
    while (timeElapsed <= timeout) {
      windowHandles = await this.getAllWindowHandles();
      if (comparator(windowHandles.length, total)) {
        return windowHandles;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      timeElapsed += delay;
    }
    throw new Error('waitForWindows timed out polling window handles');
  }
}
