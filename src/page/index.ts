import { PlaywrightPageObject } from '../playwright/page-object';
import { WebDriverPageObject } from '../webdriver/page-object';
import { IPageObject } from '../interface/page-object';
import { DappDriver } from '../session/dapp-driver';
import { Page } from '../types';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class PageObject implements IPageObject {
  private page: Page;
  private url: string | RegExp;
  private title: string | RegExp;

  constructor(url: string | RegExp = '', title: string = '') {
    this.initialize(url, title);
  }

  initialize(url: string | RegExp, title: string): void {
    this.page = DappDriver.Instance.Page;
    this.url = url;
    this.title = title;
  }

  private async callIfMethodExists(methodName: keyof IPageObject, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const playwrightPageObject = new PlaywrightPageObject(this.page);
      return await (playwrightPageObject[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const webDriverPageObject = new WebDriverPageObject();
      return await (webDriverPageObject[methodName] as Function)(...args);
    }
  }

  private getFullURL(url: string): string {
    const protocols = ['http', 'chrome-extension://'];
    if (protocols.some((protocol) => url.startsWith(protocol))) {
      return url;
    } else {
      return DappDriver.Instance.Domain + url;
    }
  }

  private getTitleRegex(): RegExp {
    return this.title instanceof RegExp ? this.title : new RegExp(this.title, 'iu');
  }

  private getURLRegex(): RegExp {
    return this.url instanceof RegExp ? this.url : new RegExp(this.url, 'iu');
  }

  async back(): Promise<void> {
    return this.callIfMethodExists('back');
  }

  async backToPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('backToPage', [page]);
  }

  async close(): Promise<void> {
    return this.callIfMethodExists('close');
  }

  async closeAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('closeAndSwitchToMainWindow', [page]);
  }

  async createNewWindow(): Promise<void> {
    return this.callIfMethodExists('createNewWindow');
  }

  async executeScript(script: string): Promise<any> {
    return this.callIfMethodExists('executeScript', [script]);
  }

  async executeScriptAndOpensInNewWindow<TPage extends PageObject>(
    script: string,
    page: new () => TPage,
  ): Promise<TPage> {
    return this.callIfMethodExists('executeScriptAndOpensInNewWindow', [script, page]);
  }

  async getAllWindowHandles(): Promise<Array<any>> {
    return this.callIfMethodExists('getAllWindowHandles');
  }

  async getCurrentUrl(): Promise<string> {
    return this.callIfMethodExists('getCurrentUrl');
  }

  async getTitle(): Promise<string> {
    return this.callIfMethodExists('getTitle');
  }

  async getWindowHandle(): Promise<any> {
    return this.callIfMethodExists('getWindowHandle');
  }

  async maximize(): Promise<void> {
    return this.callIfMethodExists('maximize');
  }

  async navigateTo(url: string): Promise<void> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateTo', [url]);
  }

  async navigateToPage<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateToPage', [url, page]);
  }

  async navigateToPageInNewWindow<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateToPageInNewWindow', [url, page]);
  }

  async opensInNewWindow(): Promise<void> {
    return this.callIfMethodExists('opensInNewWindow');
  }

  async refresh(): Promise<void> {
    return this.callIfMethodExists('refresh');
  }

  async refreshPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('refreshPage', [page]);
  }

  async setSize(width: number, height: number): Promise<void> {
    return this.callIfMethodExists('setSize', [width, height]);
  }

  async switchBack(): Promise<void> {
    return this.callIfMethodExists('switchBack');
  }

  async switchToFrame(cssLocator: string): Promise<void> {
    return this.callIfMethodExists('switchToFrame', [cssLocator]);
  }

  async switchToMainWindow(): Promise<void> {
    return this.callIfMethodExists('switchToMainWindow');
  }

  async switchToWindow(nameOrHandle: string): Promise<any> {
    return this.callIfMethodExists('switchToWindow', [nameOrHandle]);
  }

  async waitForElement(cssLocator: string): Promise<void> {
    return this.callIfMethodExists('waitForElement', [cssLocator]);
  }

  async waitForFunction(func: Function, errMsg: string, timeout: number = 10_000): Promise<void> {
    const delay: number = 500;
    let timeElapsed: number = 0;
    let result: boolean = false;
    while (timeElapsed <= timeout) {
      try {
        result = await func();
      } catch (e) {}
      if (result) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      timeElapsed += delay;
    }
    throw new Error(`${errMsg}\nWait timed out after ${timeout}ms`);
  }

  async waitForTitle(title?: RegExp): Promise<void> {
    title = title ? title : this.getTitleRegex();
    return this.callIfMethodExists('waitForTitle', [title]);
  }

  async waitForURL(url?: RegExp): Promise<void> {
    url = url ? url : this.getURLRegex();
    return this.callIfMethodExists('waitForURL', [url]);
  }

  async waitForWindows(total: number): Promise<Array<string>> {
    return this.callIfMethodExists('waitForWindows', [total]);
  }
}
