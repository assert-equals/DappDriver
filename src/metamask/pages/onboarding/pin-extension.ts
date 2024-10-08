import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Home } from '../home';

/**
 *
 *
 * @export
 * @class PinExtension
 * @extends {PageObject}
 */
export class PinExtension extends PageObject {
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="pin-extension-next"]');
  private doneButton: () => HTMLElement = () => new HTMLElement('[data-testid="pin-extension-done"]');
  /**
   * Creates an instance of PinExtension.
   * @memberof PinExtension
   */
  constructor() {
    super('/home.html#onboarding/pin-extension', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof PinExtension
   */
  async next(): Promise<void> {
    return await this.nextButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<Home>}
   * @memberof PinExtension
   */
  async done(): Promise<Home> {
    return await this.doneButton().click<Home>(Home);
  }
}
