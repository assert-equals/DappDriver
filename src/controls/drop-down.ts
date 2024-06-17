import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IDropDown } from '../interface/controls/drop-down';
import { IHTMLElement } from '../interface/controls/html-element';
import { PlaywrightDropDown } from '../playwright/drop-down';
import { DappDriver } from '../session/dapp-driver';
import { WebDriverDropDown } from '../webdriver/drop-down';
import { HTMLElement } from './html-element';

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
   * @protected
   * @param {(keyof IHTMLElement | keyof IDropDown)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof DropDown
   */
  protected async callIfMethodExists(
    methodName: keyof IHTMLElement | keyof IDropDown,
    args: Array<any> = []
  ): Promise<any> {
    let dropdown: PlaywrightDropDown | WebDriverDropDown;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      dropdown = new PlaywrightDropDown(this.cssLocator);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      dropdown = new WebDriverDropDown(this.cssLocator);
    }
    return await (dropdown[methodName] as Function)(...args);
  }
  /**
   *
   * Schedules a command to retrieve the selected option in this element
   * @return {*}  {Promise<string>}
   * @memberof DropDown
   */
  async getSelectedOption(): Promise<string> {
    return this.callIfMethodExists('getSelectedOption');
  }
  /**
   *
   * Schedules a command to select an option in this element
   * @param {number} index
   * @return {*}  {Promise<void>}
   * @memberof DropDown
   */
  async selectByIndex(index: number): Promise<void> {
    return this.callIfMethodExists('selectByIndex', [index]);
  }
  /**
   *
   * Schedules a command to select an option in this element
   * @param {string} text
   * @return {*}  {Promise<void>}
   * @memberof DropDown
   */
  async selectByText(text: string): Promise<void> {
    return this.callIfMethodExists('selectByText', [text]);
  }
  /**
   *
   * Schedules a command to select an option in this element
   * @param {string} value
   * @return {*}  {Promise<void>}
   * @memberof DropDown
   */
  async selectByValue(value: string): Promise<void> {
    return this.callIfMethodExists('selectByValue', [value]);
  }
}
