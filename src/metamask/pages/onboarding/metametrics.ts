import { Completion } from '../..';
import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Metametrics
 * @extends {PageObject}
 */
export class Metametrics extends PageObject {
  private get iAgreeButton(): HTMLElement {
    return new HTMLElement('[data-testid="metametrics-i-agree"]');
  }
  /**
   * Creates an instance of Metametrics.
   * @memberof Metametrics
   */
  constructor() {
    super('/home.html#/onboarding/metametrics', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<Completion>}
   * @memberof Metametrics
   */
  async continue(): Promise<Completion> {
    return await this.iAgreeButton.click<Completion>(Completion);
  }
}
