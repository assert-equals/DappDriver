import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IHTMLElement } from '../interface/controls/html-element';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PlaywrightHTMLElement } from '../playwright/html-element';
import { DappDriver } from '../session/dapp-driver';
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
  click<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('click', [page]);
    } else {
      return this.callIfMethodExists('click');
    }
  }
  /**
   *
   * Schedules a command to click on this element and wait for the given amount of time
   * @param {number} [duration=1000]
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  clickAndWait(duration: number = 1000): Promise<void> {
    return this.callIfMethodExists('clickAndWait', [duration]);
  }
  /**
   *
   * Schedules a command to click on this element and switch the focus of all future commands to the extension
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElement
   */
  clickAndOpensInExtension(): Promise<void>;
  clickAndOpensInExtension<TPage extends IConfirmation>(page: new () => TPage): Promise<TPage>;
  clickAndOpensInExtension<TPage extends IConfirmation>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('clickAndOpensInExtension', [page]);
    } else {
      return this.callIfMethodExists('clickAndOpensInExtension');
    }
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
  clickAndOpensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('clickAndOpensInNewWindow', [page]);
    } else {
      return this.callIfMethodExists('clickAndOpensInNewWindow');
    }
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
  clickAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('clickAndSwitchToMainWindow', [page]);
    } else {
      return this.callIfMethodExists('clickAndSwitchToMainWindow');
    }
  }
  /**
   *
   * Schedules a command to query for the value of the given attribute of the element
   * @param {string} attribute
   * @return {*}  {(Promise<string | null>)}
   * @memberof HTMLElement
   */
  getAttribute(attribute: string): Promise<string | null> {
    return this.callIfMethodExists('getAttribute', [attribute]);
  }
  /**
   *
   * Schedules a command to query for the value of the given css property of the element
   * @param {string} property
   * @return {*}  {(Promise<string | null>)}
   * @memberof HTMLElement
   */
  getCssValue(property: string): Promise<string | null> {
    return this.callIfMethodExists('getCssValue', [property]);
  }
  /**
   *
   * Schedules a command to query for the visible innerText of the element
   * @return {*}  {Promise<string>}
   * @memberof HTMLElement
   */
  getText(): Promise<string> {
    return this.callIfMethodExists('getText');
  }
  /**
   *
   * Schedules a command to hover over this element
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  hover(): Promise<void> {
    return this.callIfMethodExists('hover');
  }
  /**
   *
   * Schedules a command to query whether this element is currently displayed
   * @return {*}  {Promise<boolean>}
   * @memberof HTMLElement
   */
  isDisplayed(): Promise<boolean> {
    return this.callIfMethodExists('isDisplayed');
  }
  /**
   *
   * Schedules a command to query whether the element is enabled
   * @return {*}  {Promise<boolean>}
   * @memberof HTMLElement
   */
  isEnabled(): Promise<boolean> {
    return this.callIfMethodExists('isEnabled');
  }
  /**
   *
   * Schedules a command to query whether the element is visible
   * @return {*}  {Promise<boolean>}
   * @memberof HTMLElement
   */
  isVisible(): Promise<boolean> {
    return this.callIfMethodExists('isVisible');
  }
  /**
   *
   * Schedules a command to type a sequence in the element
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof HTMLElement
   */
  type(keys: string): Promise<void> {
    return this.callIfMethodExists('type', [keys]);
  }
}
