import { PLAYWRIGHT, WEBDRIVER } from '../constants';
import { IHTMLElementCollection } from '../interface/controls/html-element-collection';
import { PlaywrightHTMLElementCollection } from '../playwright/html-element-collection';
import { DappDriver } from '../session/dapp-driver';
import { WebDriverHTMLElementCollection } from '../webdriver/html-element-collection';
import { HTMLElement } from './html-element';

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
   * @protected
   * @param {keyof IHTMLElementCollection} methodName
   * @param {Array<any>} [args=[]]
   * @return {*}  {Promise<any>}
   * @memberof HTMLElementCollection
   */
  protected async callIfMethodExists(methodName: keyof IHTMLElementCollection, args: Array<any> = []): Promise<any> {
    let htmlElementCollection: PlaywrightHTMLElementCollection | WebDriverHTMLElementCollection;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      htmlElementCollection = new PlaywrightHTMLElementCollection(this.cssLocator);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      htmlElementCollection = new WebDriverHTMLElementCollection(this.cssLocator);
    }
    return await (htmlElementCollection[methodName] as Function)(...args);
  }
  /**
   *
   * Schedules a command to retrieve the elements
   * @return {*}  {Promise<Array<HTMLElement>>}
   * @memberof HTMLElementCollection
   */
  async elements(): Promise<Array<HTMLElement>> {
    return await this.callIfMethodExists('elements');
  }
}
