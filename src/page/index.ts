import { PlaywrightPageObject } from '../playwright/page-object';
import { WebDriverPageObject } from '../webdriver/page-object';
import { IPageObject } from '../interface/page-object';
import { DappDriver } from '../session/dapp-driver';
import { Page } from '../types';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
/**
 *
 *
 * @export
 * @class PageObject
 * @implements {IPageObject}
 */
export class PageObject implements IPageObject {
  private page: Page;
  private url: string | RegExp;
  private title: string | RegExp;
  /**
   * Creates an instance of PageObject.
   * @param {(string | RegExp)} [url='']
   * @param {string} [title='']
   * @memberof PageObject
   */
  constructor(url: string | RegExp = '', title: string = '') {
    this.initialize(url, title);
  }
  /**
   *
   *
   * @param {(string | RegExp)} url
   * @param {string} title
   * @memberof PageObject
   */
  initialize(url: string | RegExp, title: string): void {
    this.page = DappDriver.Instance.Page;
    this.url = url;
    this.title = title;
  }
  /**
   *
   *
   * @private
   * @param {keyof IPageObject} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  private async callIfMethodExists(methodName: keyof IPageObject, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const playwrightPageObject = new PlaywrightPageObject(this.page);
      return await (playwrightPageObject[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const webDriverPageObject = new WebDriverPageObject();
      return await (webDriverPageObject[methodName] as Function)(...args);
    }
  }
  /**
   *
   *
   * @private
   * @param {string} url
   * @return {*}  {string}
   * @memberof PageObject
   */
  private getFullURL(url: string): string {
    const protocols = ['http', 'chrome-extension://'];
    if (protocols.some((protocol) => url.startsWith(protocol))) {
      return url;
    } else {
      return DappDriver.Instance.Domain + url;
    }
  }
  /**
   *
   *
   * @private
   * @return {*}  {RegExp}
   * @memberof PageObject
   */
  private getTitleRegex(): RegExp {
    return this.title instanceof RegExp ? this.title : new RegExp(this.title, 'iu');
  }
  /**
   *
   *
   * @private
   * @return {*}  {RegExp}
   * @memberof PageObject
   */
  private getURLRegex(): RegExp {
    return this.url instanceof RegExp ? this.url : new RegExp(this.url, 'iu');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async back(): Promise<void> {
    return this.callIfMethodExists('back');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async backToPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('backToPage', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async close(): Promise<void> {
    return this.callIfMethodExists('close');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async closeAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('closeAndSwitchToMainWindow', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async createNewWindow(): Promise<void> {
    return this.callIfMethodExists('createNewWindow');
  }
  /**
   *
   *
   * @param {string} script
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async executeScript(script: string): Promise<any> {
    return this.callIfMethodExists('executeScript', [script]);
  }
  /**
   *
   *
   * @template TPage
   * @param {string} script
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async executeScriptAndOpensInNewWindow<TPage extends PageObject>(
    script: string,
    page: new () => TPage,
  ): Promise<TPage> {
    return this.callIfMethodExists('executeScriptAndOpensInNewWindow', [script, page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<any>>}
   * @memberof PageObject
   */
  async getAllWindowHandles(): Promise<Array<any>> {
    return this.callIfMethodExists('getAllWindowHandles');
  }
  /**
   *
   *
   * @return {*}  {Promise<string>}
   * @memberof PageObject
   */
  async getCurrentUrl(): Promise<string> {
    return this.callIfMethodExists('getCurrentUrl');
  }
  /**
   *
   *
   * @return {*}  {Promise<string>}
   * @memberof PageObject
   */
  async getTitle(): Promise<string> {
    return this.callIfMethodExists('getTitle');
  }
  /**
   *
   *
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async getWindowHandle(): Promise<any> {
    return this.callIfMethodExists('getWindowHandle');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async maximize(): Promise<void> {
    return this.callIfMethodExists('maximize');
  }
  /**
   *
   *
   * @param {string} url
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async navigateTo(url: string): Promise<void> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateTo', [url]);
  }
  /**
   *
   *
   * @template TPage
   * @param {string} url
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async navigateToPage<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateToPage', [url, page]);
  }
  /**
   *
   *
   * @template TPage
   * @param {string} url
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async navigateToPageInNewWindow<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateToPageInNewWindow', [url, page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async opensInNewWindow(): Promise<void> {
    return this.callIfMethodExists('opensInNewWindow');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async refresh(): Promise<void> {
    return this.callIfMethodExists('refresh');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async refreshPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('refreshPage', [page]);
  }
  /**
   *
   *
   * @param {number} width
   * @param {number} height
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async setSize(width: number, height: number): Promise<void> {
    return this.callIfMethodExists('setSize', [width, height]);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchBack(): Promise<void> {
    return this.callIfMethodExists('switchBack');
  }
  /**
   *
   *
   * @param {string} cssLocator
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchToFrame(cssLocator: string): Promise<void> {
    return this.callIfMethodExists('switchToFrame', [cssLocator]);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchToMainWindow(): Promise<void> {
    return this.callIfMethodExists('switchToMainWindow');
  }
  /**
   *
   *
   * @param {string} nameOrHandle
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async switchToWindow(nameOrHandle: string): Promise<any> {
    return this.callIfMethodExists('switchToWindow', [nameOrHandle]);
  }
  /**
   *
   *
   * @param {string} cssLocator
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async waitForElement(cssLocator: string): Promise<void> {
    return this.callIfMethodExists('waitForElement', [cssLocator]);
  }
  /**
   *
   *
   * @param {Function} func
   * @param {string} errMsg
   * @param {number} [timeout=10_000]
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
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
  /**
   *
   *
   * @param {RegExp} [title]
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async waitForTitle(title?: RegExp): Promise<void> {
    title = title ? title : this.getTitleRegex();
    return this.callIfMethodExists('waitForTitle', [title]);
  }
  /**
   *
   *
   * @param {RegExp} [url]
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async waitForURL(url?: RegExp): Promise<void> {
    url = url ? url : this.getURLRegex();
    return this.callIfMethodExists('waitForURL', [url]);
  }
  /**
   *
   *
   * @param {number} total
   * @return {*}  {Promise<Array<string>>}
   * @memberof PageObject
   */
  async waitForWindows(total: number): Promise<Array<string>> {
    return this.callIfMethodExists('waitForWindows', [total]);
  }
}
