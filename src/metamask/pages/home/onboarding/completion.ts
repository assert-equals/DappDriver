import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { PinExtension } from './pin-extension';
/**
 *
 *
 * @export
 * @class Completion
 * @extends {PageObject}
 */
export class Completion extends PageObject {
  private completeButton: () => HTMLElement = () => new HTMLElement('[data-testid="onboarding-complete-done"]');
  /**
   * Creates an instance of Completion.
   * @memberof Completion
   */
  constructor() {
    super('/home.html#onboarding/completion', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<PinExtension>}
   * @memberof Completion
   */
  completeOnboarding(): Promise<PinExtension> {
    return this.completeButton().clickAndRedirectsTo<PinExtension>(PinExtension);
  }
}
