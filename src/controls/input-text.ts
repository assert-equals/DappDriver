import { DappDriver } from '../session/dapp-driver';
import { IHTMLElement } from '../interface/controls/html-element';
import { IInputText } from '../interface/controls/input-text';
import { PlaywrightInputText } from '../playwright/input-text';
import { WebDriverInputText } from '../webdriver/input-text';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
/**
 *
 *
 * @export
 * @class InputText
 * @extends {HTMLElement}
 * @implements {IInputText}
 */
export class InputText extends HTMLElement implements IInputText {
  /**
   * Creates an instance of InputText.
   * @param {string} cssLocator
   * @memberof InputText
   */
  constructor(cssLocator: string) {
    super(cssLocator);
  }
  /**
   *
   *
   * @protected
   * @param {(keyof IHTMLElement | keyof IInputText)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof InputText
   */
  protected async callIfMethodExists(
    methodName: keyof IHTMLElement | keyof IInputText,
    args: Array<any> = [],
  ): Promise<any> {
    let inputText: PlaywrightInputText | WebDriverInputText;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      inputText = new PlaywrightInputText(this.cssLocator);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      inputText = new WebDriverInputText(this.cssLocator);
    }
    return await (inputText[methodName] as Function)(...args);
  }
  /**
   *
   * Schedules a command to clear the value of this element
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async clear(): Promise<void> {
    return this.callIfMethodExists('clear');
  }
  /**
   *
   * Schedules a command to focus in this element
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async focus(): Promise<void> {
    return await this.callIfMethodExists('focus');
  }
  /**
   *
   * Schedules a command to query for the value attribute of the element
   * @return {*}  {Promise<string>}
   * @memberof InputText
   */
  async getText(): Promise<string> {
    return await this.callIfMethodExists('getText');
  }
  /**
   *
   * Schedules a command to query for the value attribute of the element
   * @return {*}  {Promise<string>}
   * @memberof InputText
   */
  async getValue(): Promise<string> {
    return await this.callIfMethodExists('getValue');
  }
  /**
   *
   * Schedules a command to type a sequence in the element
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async type(keys: string): Promise<void> {
    return this.callIfMethodExists('type', [keys]);
  }
  /**
   *
   * Schedules a command to type a sequence in the element
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async typeAndEnter(keys: string): Promise<void> {
    return this.callIfMethodExists('typeAndEnter', [keys]);
  }
  /**
   *
   * Schedules a command to type a sequence in the element
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async typeAndTab(keys: string): Promise<void> {
    return this.callIfMethodExists('typeAndTab', [keys]);
  }
}
