import { DappDriver } from '../session/dapp-driver';
import { IHTMLElementCollection } from '../interface/html-element-collection';
import { PlaywrightHTMLElementCollection } from '../playwright/html-element-collection';
import { WebDriverHTMLElementCollection } from '../webdriver/html-element-collection';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';
/**
 *
 *
 * @export
 * @class HTMLElementCollection
 * @implements {IHTMLElementCollection}
 */
export class HTMLElementCollection implements IHTMLElementCollection {
  private cssLocator: string;
  /**
   * Creates an instance of HTMLElementCollection.
   * @param {string} cssLocator
   * @memberof HTMLElementCollection
   */
  constructor(cssLocator: string) {
    this.cssLocator = cssLocator;
  }
  /**
   *
   *
   * @param {keyof IHTMLElementCollection} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElementCollection
   */
  async callIfMethodExists(methodName: keyof IHTMLElementCollection, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightHTMLElementCollection(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverHTMLElementCollection(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<HTMLElement>>}
   * @memberof HTMLElementCollection
   */
  async elements(): Promise<Array<HTMLElement>> {
    return await this.callIfMethodExists('elements');
  }
}
