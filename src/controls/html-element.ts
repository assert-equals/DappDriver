import { IHTMLElement } from '../interface/html-element';
import { DappDriver } from '../session/dapp-driver';
import { PlaywrightHTMLElement } from '../playwright/html-element';
import { WebDriverHTMLElement } from '../webdriver/html-element';
import { PageObject } from '../page';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
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
   * @param {keyof IHTMLElement} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElement
   */
  async callIfMethodExists(methodName: keyof IHTMLElement, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightHTMLElement(this.cssLocator, this.timeout, this.element);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverHTMLElement(this.cssLocator, this.timeout, this.element);
      return await (d[methodName] as Function)(...args);
    }
  }
  /**
   *
   * Schedules a command to click on this element
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  async click(): Promise<void> {
    return this.callIfMethodExists('click');
  }
  /**
   *
   * Schedules a command to click on this element and wait for the given amount of time
   * @param {number} [duration=1000]
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  async clickAndWait(duration: number = 1000): Promise<void> {
    return this.callIfMethodExists('clickAndWait', [duration]);
  }
  /**
   *
   * Schedules a command to click on this element and switch the focus of all future commands to another window
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}
   * @memberof HTMLElement
   */
  async clickAndOpensInNewWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.callIfMethodExists('clickAndOpensInNewWindow', [page]);
  }
  /**
   *
   * Schedules a command to click on this element and redirect to a new page
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}
   * @memberof HTMLElement
   */
  async clickAndRedirectsTo<TPage extends PageObject>(page: new () => TPage) {
    return this.callIfMethodExists('clickAndRedirectsTo', [page]);
  }
  /**
   *
   * Schedules a command to click on this element and switch the focus of all future commands to the main window
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}
   * @memberof HTMLElement
   */
  async clickAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.callIfMethodExists('clickAndSwitchToMainWindow', [page]);
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
    return this.callIfMethodExists('hover');
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
    return this.callIfMethodExists('type', [keys]);
  }
}
