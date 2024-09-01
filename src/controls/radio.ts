import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IHTMLElement } from '../interface/controls/html-element';
import { IRadio } from '../interface/controls/radio';
import { PlaywrightRadio } from '../playwright/radio';
import { DappDriver } from '../session/dapp-driver';
import { WebDriverRadio } from '../webdriver/radio';
import { HTMLElement } from './html-element';

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
    args: Array<any> = []
  ): Promise<any> {
    let radio: PlaywrightRadio | WebDriverRadio;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      radio = new PlaywrightRadio(this.cssLocator);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      radio = new WebDriverRadio(this.cssLocator);
    }
    return await (radio[methodName] as Function)(...args);
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
    return await this.callIfMethodExists('select');
  }
}
