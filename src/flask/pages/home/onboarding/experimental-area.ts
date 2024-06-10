import { HTMLElement } from '../../../../controls/html-element';
import { Welcome } from '../../../../metamask';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class ExperimentalArea
 * @extends {PageObject}
 */
export class ExperimentalArea extends PageObject {
  private iAcceptButton: () => HTMLElement = () => new HTMLElement('[data-testid="experimental-area"] button');
  /**
   * Creates an instance of ExperimentalArea.
   * @memberof ExperimentalArea
   */
  constructor() {
    super('/home.html#onboarding/experimental-area', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<Welcome>}
   * @memberof ExperimentalArea
   */
  iAccept(): Promise<Welcome> {
    return this.iAcceptButton().click<Welcome>(Welcome);
  }
}
