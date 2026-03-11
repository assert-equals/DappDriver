import { SidePanel } from '../..';
import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Completion
 * @extends {PageObject}
 */
export class Completion extends PageObject {
  private get completeButton(): HTMLElement {
    return new HTMLElement('[data-testid="onboarding-complete-done"]');
  }
  /**
   * Creates an instance of Completion.
   * @memberof Completion
   */
  constructor() {
    super('/home.html#/onboarding/completion', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<SidePanel>}
   * @memberof Completion
   */
  async completeOnboarding(): Promise<SidePanel> {
    return await this.completeButton.clickAndSwitchToWindow<SidePanel>(SidePanel);
  }
}
