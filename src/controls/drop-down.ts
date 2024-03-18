import { DappDriver } from '../session/dapp-driver';
import { IDropDown } from '../interface/drop-down';
import { IHTMLElement } from '../interface/html-element';
import { PlaywrightDropDown } from '../playwright/drop-down';
import { WebDriverDropDown } from '../webdriver/drop-down';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
/**
 *
 *
 * @export
 * @class DropDown
 * @extends {HTMLElement}
 * @implements {IDropDown}
 */
export class DropDown extends HTMLElement implements IDropDown {
  /**
   * Creates an instance of DropDown.
   * @param {string} cssLocator
   * @memberof DropDown
   */
  constructor(cssLocator: string) {
    super(cssLocator);
  }
  /**
   *
   *
   * @param {(keyof IHTMLElement | keyof IDropDown)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof DropDown
   */
  async callIfMethodExists(methodName: keyof IHTMLElement | keyof IDropDown, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightDropDown(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverDropDown(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<string>}
   * @memberof DropDown
   */
  async getSelectedOption(): Promise<string> {
    return this.callIfMethodExists('getSelectedOption');
  }
  /**
   *
   *
   * @param {number} index
   * @return {*}  {Promise<void>}
   * @memberof DropDown
   */
  async selectByIndex(index: number): Promise<void> {
    return this.callIfMethodExists('selectByIndex', [index]);
  }
  /**
   *
   *
   * @param {string} text
   * @return {*}  {Promise<void>}
   * @memberof DropDown
   */
  async selectByText(text: string): Promise<void> {
    return this.callIfMethodExists('selectByText', [text]);
  }
  /**
   *
   *
   * @param {string} value
   * @return {*}  {Promise<void>}
   * @memberof DropDown
   */
  async selectByValue(value: string): Promise<void> {
    return this.callIfMethodExists('selectByValue', [value]);
  }
}
