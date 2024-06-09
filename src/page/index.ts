import { PlaywrightPageObject } from '../playwright/page-object';
import { WebDriverPageObject } from '../webdriver/page-object';
import { IPageObject } from '../interface/page/page-object';
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
    let pageObject: PlaywrightPageObject | WebDriverPageObject;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      pageObject = new PlaywrightPageObject(this.page);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      pageObject = new WebDriverPageObject();
    }
    return await (pageObject[methodName] as Function)(...args);
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
   * @param {string} str
   * @return {*}  {string}
   * @memberof PageObject
   */
  private escapeSpecialChars(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  /**
   *
   *
   * @private
   * @return {*}  {RegExp}
   * @memberof PageObject
   */
  private getTitleRegex(): RegExp {
    return this.title instanceof RegExp ? this.title : new RegExp(this.escapeSpecialChars(this.title), 'iu');
  }
  /**
   *
   *
   * @private
   * @return {*}  {RegExp}
   * @memberof PageObject
   */
  private getURLRegex(): RegExp {
    return this.url instanceof RegExp ? this.url : new RegExp(this.escapeSpecialChars(this.url), 'iu');
  }
  /**
   *
   * Schedules a command to navigate to the previous URL
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async back(): Promise<void> {
    return this.callIfMethodExists('back');
  }
  /**
   *
   * Schedules a command to navigate to the previous page
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async backToPage<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('backToPage', [page]);
  }
  /**
   *
   * Schedules a command to close the current window
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async close(): Promise<void> {
    return this.callIfMethodExists('close');
  }
  /**
   *
   * Schedules a command to close the current window and switch the focus of all future commands to the main window
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async closeAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('closeAndSwitchToMainWindow', [page]);
  }
  /**
   *
   * Schedules a command to open a new window
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async createNewWindow(): Promise<void> {
    return this.callIfMethodExists('createNewWindow');
  }
  /**
   *
   * Schedules a command to execute JavaScript in the context of the currently selected frame or window
   * @param {string} script
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async executeScript(script: string): Promise<any> {
    return this.callIfMethodExists('executeScript', [script]);
  }
  /**
   *
   * Schedules a command to execute JavaScript in the context of the currently selected frame or window and switch the focus of all future commands to another window
   * @template TPage
   * @param {string} script
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async executeScriptAndOpensInNewWindow<TPage>(script: string, page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('executeScriptAndOpensInNewWindow', [script, page]);
  }
  /**
   *
   * Schedules a command to retrieve the current list of available window handles
   * @return {*}  {Promise<Array<any>>}
   * @memberof PageObject
   */
  async getAllWindowHandles(): Promise<Array<any>> {
    return this.callIfMethodExists('getAllWindowHandles');
  }
  /**
   *
   * Schedules a command to retrieve the URL of the current page
   * @return {*}  {Promise<string>}
   * @memberof PageObject
   */
  async getCurrentUrl(): Promise<string> {
    return this.callIfMethodExists('getCurrentUrl');
  }
  /**
   *
   * Schedules a command to retrieve the current page title
   * @return {*}  {Promise<string>}
   * @memberof PageObject
   */
  async getTitle(): Promise<string> {
    return this.callIfMethodExists('getTitle');
  }
  /**
   *
   * Schedules a command to retrieve the current window handle
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async getWindowHandle(): Promise<any> {
    return this.callIfMethodExists('getWindowHandle');
  }
  /**
   *
   * Schedules a command to maximize the window
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async maximize(): Promise<void> {
    return this.callIfMethodExists('maximize');
  }
  /**
   *
   * Schedules a command to navigate to a new URL
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
   * Schedules a command to navigate to a new page
   * @template TPage
   * @param {string} url
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async navigateToPage<TPage>(url: string, page: new () => TPage): Promise<TPage> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateToPage', [url, page]);
  }
  /**
   *
   * Schedules a command to navigate to a new page in a new window
   * @template TPage
   * @param {string} url
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage> {
    url = this.getFullURL(url);
    return this.callIfMethodExists('navigateToPageInNewWindow', [url, page]);
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to another window
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async opensInNewWindow(): Promise<void> {
    return this.callIfMethodExists('opensInNewWindow');
  }
  /**
   *
   * Schedules a command to refresh the current page
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async refresh(): Promise<void> {
    return this.callIfMethodExists('refresh');
  }
  /**
   *
   * Schedules a command to refresh the current page
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async refreshPage<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('refreshPage', [page]);
  }
  /**
   *
   * Schedules a command to resize the window
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
   * Schedules a command to switch focus of all future commands to the topmost frame on the page
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchBack(): Promise<void> {
    return this.callIfMethodExists('switchBack');
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to another frame on the page
   * @param {string} cssLocator
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchToFrame(cssLocator: string): Promise<void> {
    return this.callIfMethodExists('switchToFrame', [cssLocator]);
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to the main window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('switchToMainWindow', [page]);
    } else {
      return this.callIfMethodExists('switchToMainWindow');
    }
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to a given window
   * @template TPage
   * @param {*} nameOrHandle
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('switchToWindow', [nameOrHandle]);
    } else {
      return this.callIfMethodExists('switchToWindow');
    }
  }
  /**
   *
   * Schedules a command to wait for an element to appear
   * @param {string} cssLocator
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async waitForElement(cssLocator: string): Promise<void> {
    return this.callIfMethodExists('waitForElement', [cssLocator]);
  }
  /**
   *
   * Schedules a command to wait for a function to return a truthy value
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
   * Schedules a command to wait for the required title to be returned
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
   * Schedules a command to wait for the current page to navigate to the given URL
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
   * Schedules a command to wait for the required count of windows
   * @param {number} total
   * @return {*}  {Promise<Array<string>>}
   * @memberof PageObject
   */
  async waitForWindows(total: number): Promise<Array<string>> {
    return this.callIfMethodExists('waitForWindows', [total]);
  }
}
