import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IHTMLElement } from '../interface/controls/html-element';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PlaywrightHTMLElement } from '../playwright/html-element';
import { DappDriver } from '../session/dapp-driver';
import { toRegExp } from '../utils';
import { WebDriverHTMLElement } from '../webdriver/html-element';

/**
 *
 *
 * @export
 * @class HTMLElement
 * @implements {IHTMLElement}
 */
export class HTMLElement implements IHTMLElement {
  protected cssLocator: string;
  private element: any;
  private timeout: number;
  /**
   * Creates an instance of HTMLElement.
   * @param {string} cssLocator
   * @param {number} [timeout=20000]
   * @param {*} [element=null]
   * @memberof HTMLElement
   */
  constructor(cssLocator: string, timeout: number = 20000, element: any = null) {
    this.cssLocator = cssLocator;
    this.element = element;
    this.timeout = timeout;
  }
  /**
   *
   *
   * @protected
   * @param {keyof IHTMLElement} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElement
   */
  protected async callIfMethodExists(methodName: keyof IHTMLElement, args: Array<any> = []): Promise<any> {
    let htmlElement: PlaywrightHTMLElement | WebDriverHTMLElement;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      htmlElement = new PlaywrightHTMLElement(this.cssLocator, this.timeout, this.element);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      htmlElement = new WebDriverHTMLElement(this.cssLocator, this.timeout, this.element);
    }
    return await (htmlElement[methodName] as Function)(...args);
  }
  /**
   *
   * Schedules a command to click on this element
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElement
   */
  click(): Promise<void>;
  click<TPage>(page: new () => TPage): Promise<TPage>;
  async click<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('click', [page]);
    } else {
      return await this.callIfMethodExists('click');
    }
  }
  /**
   *
   * Schedules a command to click on this element and wait for the given amount of time
   * @param {number} [duration=1000]
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  async clickAndWait(duration: number = 1000): Promise<void> {
    return await this.callIfMethodExists('clickAndWait', [duration]);
  }
  /**
   *
   * Schedules a command to click on this element and switch the focus of all future commands to another window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElement
   */
  clickAndOpensInNewWindow(): Promise<void>;
  clickAndOpensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async clickAndOpensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('clickAndOpensInNewWindow', [page]);
    } else {
      return await this.callIfMethodExists('clickAndOpensInNewWindow');
    }
  }
  /**
   *
   * Schedules a command to click on this element and switch the focus of all future commands to the window
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof HTMLElement
   */
  async clickAndOpensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('clickAndOpensInWindow', [page]);
  }
  /**
   *
   * Schedules a command to click on this element and switch the focus of all future commands to the main window
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElement
   */
  clickAndSwitchToMainWindow(): Promise<void>;
  clickAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async clickAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('clickAndSwitchToMainWindow', [page]);
    } else {
      return await this.callIfMethodExists('clickAndSwitchToMainWindow');
    }
  }
  /**
   *
   * Schedules a command to query for the value of the given attribute of the element
   * @param {string} attribute
   * @return {*}  {(Promise<string | null>)}
   * @memberof HTMLElement
   */
  async getAttribute(attribute: string): Promise<string | null> {
    return await this.callIfMethodExists('getAttribute', [attribute]);
  }
  /**
   *
   * Schedules a command to query for the value of the given css property of the element
   * @param {string} property
   * @return {*}  {(Promise<string | null>)}
   * @memberof HTMLElement
   */
  async getCssValue(property: string): Promise<string | null> {
    return await this.callIfMethodExists('getCssValue', [property]);
  }
  /**
   *
   * Schedules a command to query for the visible innerText of the element
   * @return {*}  {Promise<string>}
   * @memberof HTMLElement
   */
  async getText(): Promise<string> {
    return await this.callIfMethodExists('getText');
  }
  /**
   *
   * Schedules a command to hover over this element
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  async hover(): Promise<void> {
    return await this.callIfMethodExists('hover');
  }
  /**
   *
   * Schedules a command to query whether this element is currently displayed
   * @return {*}  {Promise<boolean>}
   * @memberof HTMLElement
   */
  async isDisplayed(): Promise<boolean> {
    return await this.callIfMethodExists('isDisplayed');
  }
  /**
   *
   * Schedules a command to query whether the element is enabled
   * @return {*}  {Promise<boolean>}
   * @memberof HTMLElement
   */
  async isEnabled(): Promise<boolean> {
    return await this.callIfMethodExists('isEnabled');
  }
  /**
   *
   * Schedules a command to query whether the element is visible
   * @return {*}  {Promise<boolean>}
   * @memberof HTMLElement
   */
  async isVisible(): Promise<boolean> {
    return await this.callIfMethodExists('isVisible');
  }
  /**
   *
   * Schedules a command to type a sequence in the element
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  async type(keys: string): Promise<void> {
    return await this.callIfMethodExists('type', [keys]);
  }
  /**
   *
   * Schedules a command to wait for the visible innerText of the element
   * @param {(string | RegExp)} [text]
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  async waitForText(text?: string | RegExp): Promise<void> {
    text = text ? toRegExp(text) : new RegExp(/.+/);
    return await this.callIfMethodExists('waitForText', [text]);
  }
}
