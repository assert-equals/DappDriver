import { DappDriver } from '../session/dapp-driver';
import { IHTMLElement } from '../interface/html-element';
import { IInputText } from '../interface/input-text';
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
   * @param {(keyof IHTMLElement | keyof IInputText)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof InputText
   */
  async callIfMethodExists(methodName: keyof IHTMLElement | keyof IInputText, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightInputText(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverInputText(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async clear(): Promise<void> {
    return this.callIfMethodExists('clear');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async focus(): Promise<void> {
    return await this.callIfMethodExists('focus');
  }
  /**
   *
   *
   * @return {*}  {Promise<string>}
   * @memberof InputText
   */
  async getText(): Promise<string> {
    return await this.callIfMethodExists('getText');
  }
  /**
   *
   *
   * @return {*}  {Promise<string>}
   * @memberof InputText
   */
  async getValue(): Promise<string> {
    return await this.callIfMethodExists('getValue');
  }
  /**
   *
   *
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async type(keys: string): Promise<void> {
    return this.callIfMethodExists('type', [keys]);
  }
  /**
   *
   *
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async typeAndEnter(keys: string): Promise<void> {
    return this.callIfMethodExists('typeAndEnter', [keys]);
  }
  /**
   *
   *
   * @param {string} keys
   * @return {*}  {Promise<void>}
   * @memberof InputText
   */
  async typeAndTab(keys: string): Promise<void> {
    return this.callIfMethodExists('typeAndTab', [keys]);
  }
}
