import { BrowserContext } from 'playwright-core';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';
import { Frame, Page } from '../types';

export class PlaywrightPageObject implements IPageObject {
  private page: Page;
  private driver: BrowserContext;
  private pageObject: PageObject;

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
    await this.switchToMainWindow();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async createNewWindow(): Promise<void> {
    await this.driver.newPage();
    await this.opensInNewWindow();
  }

  async executeScript(script: string): Promise<any> {
    return this.page.evaluate(script);
  }

  async executeScriptAndOpensInExtension<TPage extends IConfirmation>(
    script: string,
    page?: new () => TPage
  ): Promise<any> {
    this.page.evaluate(script);
    await this.opensInExtension();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
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

  async opensInExtension<TPage extends IConfirmation>(page?: new () => TPage): Promise<any> {
    const extension: Page = await this.waitForExtension();
    await this.switchToWindow(extension);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async opensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handles: Array<Page> = await this.waitForWindows(2);
    await this.switchToWindow(handles[1]);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
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
    await this.switchToWindow(handles[0]);
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async switchToWindow<TPage>(nameOrHandle: Page, page?: new () => TPage): Promise<any> {
    const handles: Array<Page> = this.driver.pages();
    const handle: Page = handles.find((page: Page) => page['_guid'] === nameOrHandle['_guid']);
    this.initialize(handle);
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

  async waitForExtension(): Promise<Page> {
    const handles: Array<Page> = await this.waitForWindows(2);
    return handles[1];
  }

  async waitForTitle(title: RegExp): Promise<void> {
    await this.pageObject.waitForFunction(
      async () => RegExp(title).exec(await this.getTitle()) !== null,
      `Waiting for title to match ${title}`
    );
  }

  async waitForURL(url: RegExp): Promise<void> {
    await this.pageObject.waitForFunction(
      async () => RegExp(url).exec(await this.getCurrentUrl()) !== null,
      `Waiting for url to match ${url}`,
      20000
    );
  }

  async waitForWindows(total: number): Promise<Array<Page>> {
    const timeout: number = 10_000;
    const delay: number = 100;
    let timeElapsed: number = 0;
    let windowHandles: Array<Page> = [];
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
