import { DappDriver } from '../session/dapp-driver';
import { ICheckBox } from '../interface/controls/check-box';
import { IHTMLElement } from '../interface/controls/html-element';
import { PlaywrightCheckBox } from '../playwright/check-box';
import { WebDriverCheckBox } from '../webdriver/check-box';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
/**
 *
 *
 * @export
 * @class CheckBox
 * @extends {HTMLElement}
 * @implements {ICheckBox}
 */
export class CheckBox extends HTMLElement implements ICheckBox {
  /**
   * Creates an instance of CheckBox.
   * @param {string} cssLocator
   * @memberof CheckBox
   */
  constructor(cssLocator: string) {
    super(cssLocator);
  }
  /**
   *
   *
   * @protected
   * @param {(keyof IHTMLElement | keyof ICheckBox)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof CheckBox
   */
  protected async callIfMethodExists(
    methodName: keyof IHTMLElement | keyof ICheckBox,
    args: Array<any> = [],
  ): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightCheckBox(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverCheckBox(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }
  /**
   *
   * Schedules a command to check or uncheck this element
   * @param {boolean} value
   * @return {*}  {Promise<void>}
   * @memberof CheckBox
   */
  async setValue(value: boolean): Promise<void> {
    return this.callIfMethodExists('setValue', [value]);
  }
  /**
   *
   * Schedules a command to query whether this element is currently checked
   * @return {*}  {Promise<boolean>}
   * @memberof CheckBox
   */
  async isSelected(): Promise<boolean> {
    return await this.callIfMethodExists('isSelected');
  }
}
