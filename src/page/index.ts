import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PlaywrightPageObject } from '../playwright/page-object';
import { DappDriver } from '../session/dapp-driver';
import { Comparator, Cookie, Page } from '../types';
import { strictEqual, toRegExp } from '../utils';
import { WebDriverPageObject } from '../webdriver/page-object';

/**
 *
 *
 * @export
 * @class PageObject
 * @implements {IPageObject}
 */
export class PageObject implements IPageObject {
  private page: Page;
  public url: string | RegExp;
  public title: string;
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
   * @param {Cookie} cookie
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async addCookie(cookie: Cookie): Promise<void> {
    return await this.callIfMethodExists('addCookie', [cookie]);
  }
  /**
   *
   * Schedules a command to navigate backwards in the browser history
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  back(): Promise<void>;
  back<TPage>(page: new () => TPage): Promise<TPage>;
  async back<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('back', [page]);
    } else {
      return await this.callIfMethodExists('back');
    }
  }
  /**
   *
   *
   * @param {string} name
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async clearCookie(name: string): Promise<void> {
    return await this.callIfMethodExists('clearCookie', [name]);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async clearCookies(): Promise<void> {
    return await this.callIfMethodExists('clearCookies');
  }
  /**
   *
   * Schedules a command to close the current window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  close(): Promise<void>;
  close<TPage>(page: new () => TPage): Promise<TPage>;
  async close<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('close', [page]);
    } else {
      return await this.callIfMethodExists('close');
    }
  }
  /**
   *
   * Schedules a command to close the current window and switch the focus of all future commands to the main window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  closeAndSwitchToMainWindow(): Promise<void>;
  closeAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async closeAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('closeAndSwitchToMainWindow', [page]);
    } else {
      return await this.callIfMethodExists('closeAndSwitchToMainWindow');
    }
  }
  /**
   *
   * Schedules a command to open a new window
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async createNewWindow(): Promise<void> {
    return await this.callIfMethodExists('createNewWindow');
  }
  /**
   *
   * Schedules a command to execute JavaScript in the context of the currently selected frame or window
   * @param {string} script
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async executeScript(script: string): Promise<any> {
    return await this.callIfMethodExists('executeScript', [script]);
  }
  /**
   *
   * Schedules a command to execute JavaScript in the context of the currently selected frame or window and switch the focus of all future commands to the window
   * @template TPage
   * @param {string} script
   * @param {new () => TPage} page
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async executeScriptAndOpensInWindow<TPage extends IConfirmation | IPageObject>(
    script: string,
    page: new () => TPage
  ): Promise<any> {
    return await this.callIfMethodExists('executeScriptAndOpensInWindow', [script, page]);
  }
  /**
   *
   * Schedules a command to navigate forwards in the browser history
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  forward(): Promise<void>;
  forward<TPage>(page: new () => TPage): Promise<TPage>;
  async forward<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('forward', [page]);
    } else {
      return await this.callIfMethodExists('forward');
    }
  }
  /**
   *
   * Schedules a command to retrieve the current list of available window handles
   * @return {*}  {Promise<Array<any>>}
   * @memberof PageObject
   */
  async getAllWindowHandles(): Promise<Array<any>> {
    return await this.callIfMethodExists('getAllWindowHandles');
  }
  /**
   *
   *
   * @param {string} name
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async getCookie(name: string): Promise<any> {
    return await this.callIfMethodExists('getCookie', [name]);
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<any>>}
   * @memberof PageObject
   */
  async getCookies(): Promise<Array<any>> {
    return await this.callIfMethodExists('getCookies');
  }
  /**
   *
   * Schedules a command to retrieve the URL of the current page
   * @return {*}  {Promise<string>}
   * @memberof PageObject
   */
  async getCurrentUrl(): Promise<string> {
    return await this.callIfMethodExists('getCurrentUrl');
  }
  /**
   *
   * Schedules a command to retrieve the current page title
   * @return {*}  {Promise<string>}
   * @memberof PageObject
   */
  async getTitle(): Promise<string> {
    return await this.callIfMethodExists('getTitle');
  }
  /**
   *
   * Schedules a command to retrieve the current window handle
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  async getWindowHandle(): Promise<any> {
    return await this.callIfMethodExists('getWindowHandle');
  }
  /**
   *
   * Schedules a command to maximize the window
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async maximize(): Promise<void> {
    return await this.callIfMethodExists('maximize');
  }
  /**
   *
   * Schedules a command to navigate to a new URL
   * @template TPage
   * @param {string} url
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  navigateTo(url: string): Promise<void>;
  navigateTo<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  async navigateTo<TPage>(url: string, page?: new () => TPage): Promise<any> {
    url = this.getFullURL(url);
    if (page) {
      return await this.callIfMethodExists('navigateTo', [url, page]);
    } else {
      return await this.callIfMethodExists('navigateTo', [url]);
    }
  }
  /**
   *
   * Schedules a command to navigate to a new page in a new window
   * @template TPage
   * @param {string} url
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  navigateToPageInNewWindow(url: string): Promise<void>;
  navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  async navigateToPageInNewWindow<TPage>(url: string, page?: new () => TPage): Promise<any> {
    url = this.getFullURL(url);
    if (page) {
      return await this.callIfMethodExists('navigateToPageInNewWindow', [url, page]);
    } else {
      return await this.callIfMethodExists('navigateToPageInNewWindow', [url]);
    }
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to another window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  opensInNewWindow(): Promise<void>;
  opensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async opensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('opensInNewWindow', [page]);
    } else {
      return await this.callIfMethodExists('opensInNewWindow');
    }
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to the window
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof PageObject
   */
  async opensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('opensInWindow', [page]);
  }
  /**
   *
   * Schedules a command to refresh the current page
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  refresh(): Promise<void>;
  refresh<TPage>(page: new () => TPage): Promise<TPage>;
  async refresh<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('refresh', [page]);
    } else {
      return await this.callIfMethodExists('refresh');
    }
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
    return await this.callIfMethodExists('setSize', [width, height]);
  }
  /**
   *
   * Schedules a command to switch focus of all future commands to the topmost frame on the page
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchBack(): Promise<void> {
    return await this.callIfMethodExists('switchBack');
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to another frame on the page
   * @param {string} cssLocator
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async switchToFrame(cssLocator: string): Promise<void> {
    return await this.callIfMethodExists('switchToFrame', [cssLocator]);
  }
  /**
   *
   * Schedules a command to switch the focus of all future commands to the main window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof PageObject
   */
  switchToMainWindow(): Promise<void>;
  switchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('switchToMainWindow', [page]);
    } else {
      return await this.callIfMethodExists('switchToMainWindow');
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
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  async switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('switchToWindow', [nameOrHandle, page]);
    } else {
      return await this.callIfMethodExists('switchToWindow', [nameOrHandle]);
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
    return await this.callIfMethodExists('waitForElement', [cssLocator]);
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
      await DappDriver.sleep(delay);
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
    title = title || toRegExp(this.title);
    return await this.callIfMethodExists('waitForTitle', [title]);
  }
  /**
   *
   * Schedules a command to wait for the current page to navigate to the given URL
   * @param {RegExp} [url]
   * @return {*}  {Promise<void>}
   * @memberof PageObject
   */
  async waitForURL(url?: RegExp): Promise<void> {
    url = url || toRegExp(this.url);
    return await this.callIfMethodExists('waitForURL', [url]);
  }
  /**
   *
   * Schedules a command to wait for the required count of windows
   * @param {number} total
   * @param {Comparator} comparator
   * @return {*}  {Promise<Array<any>>}
   * @memberof PageObject
   */
  async waitForWindows(total: number, comparator: Comparator = strictEqual): Promise<Array<any>> {
    return await this.callIfMethodExists('waitForWindows', [total, comparator]);
  }
}
