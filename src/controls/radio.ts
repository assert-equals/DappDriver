import { DappDriver } from '../session/dapp-driver';
import { IHTMLElement } from '../interface/html-element';
import { IRadio } from '../interface/radio';
import { PlaywrightRadio } from '../playwright/radio';
import { WebDriverRadio } from '../webdriver/radio';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
/**
 *
 *
 * @export
 * @class Radio
 * @extends {HTMLElement}
 * @implements {IRadio}
 */
export class Radio extends HTMLElement implements IRadio {
  /**
   * Creates an instance of Radio.
   * @param {string} cssLocator
   * @memberof Radio
   */
  constructor(cssLocator: string) {
    super(cssLocator);
  }
  /**
   *
   *
   * @protected
   * @param {(keyof IHTMLElement | keyof IRadio)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof Radio
   */
  protected async callIfMethodExists(
    methodName: keyof IHTMLElement | keyof IRadio,
    args: Array<any> = [],
  ): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightRadio(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverRadio(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }
  /**
   *
   * Schedules a command to query whether this element is currently selected
   * @return {*}  {Promise<boolean>}
   * @memberof Radio
   */
  async isSelected(): Promise<boolean> {
    return await this.callIfMethodExists('isSelected');
  }
  /**
   *
   * Schedules a command to select this element
   * @return {*}  {Promise<void>}
   * @memberof Radio
   */
  async select(): Promise<void> {
    return this.callIfMethodExists('select');
  }
}
