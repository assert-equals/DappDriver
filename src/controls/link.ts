import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IHTMLElement } from '../interface/controls/html-element';
import { ILink } from '../interface/controls/link';
import { PlaywrightLink } from '../playwright/link';
import { DappDriver } from '../session/dapp-driver';
import { WebDriverLink } from '../webdriver/link';
import { HTMLElement } from './html-element';

/**
 *
 *
 * @export
 * @class Link
 * @extends {HTMLElement}
 * @implements {ILink}
 */
export class Link extends HTMLElement implements ILink {
  /**
   * Creates an instance of Link.
   * @param {string} cssLocator
   * @memberof Link
   */
  constructor(cssLocator: string) {
    super(cssLocator);
  }
  /**
   *
   *
   * @protected
   * @param {(keyof IHTMLElement | keyof ILink)} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof Link
   */
  protected async callIfMethodExists(
    methodName: keyof IHTMLElement | keyof ILink,
    args: Array<any> = []
  ): Promise<any> {
    let link: PlaywrightLink | WebDriverLink;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      link = new PlaywrightLink(this.cssLocator);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      link = new WebDriverLink(this.cssLocator);
    }
    return await (link[methodName] as Function)(...args);
  }
  /**
   *
   * Schedules a command to query for the href attribute of the element
   * @return {*}  {Promise<string>}
   * @memberof Link
   */
  async location(): Promise<string> {
    return await this.callIfMethodExists('location');
  }
}
