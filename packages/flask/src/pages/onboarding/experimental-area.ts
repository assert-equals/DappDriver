import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { Welcome } from '@assert-equals/dappdriver-metamask';

/**
 *
 *
 * @export
 * @class ExperimentalArea
 * @extends {PageObject}
 */
export class ExperimentalArea extends PageObject {
  private get iAcceptButton(): HTMLElement {
    return new HTMLElement('[data-testid="experimental-area"] button');
  }
  /**
   * Creates an instance of ExperimentalArea.
   * @memberof ExperimentalArea
   */
  constructor() {
    super('/home.html#/onboarding/experimental-area', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<Welcome>}
   * @memberof ExperimentalArea
   */
  async iAccept(): Promise<Welcome> {
    return await this.iAcceptButton.clickRedirectsTo<Welcome>(Welcome);
  }
}
