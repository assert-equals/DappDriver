import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { ConfirmRecoveryPhrase } from './confirm-recovery-phrase';

/**
 *
 *
 * @export
 * @class ReviewRecoveryPhrase
 * @extends {PageObject}
 */
export class ReviewRecoveryPhrase extends PageObject {
  private revealButton: () => HTMLElement = () => new HTMLElement('[data-testid="recovery-phrase-reveal"]');
  private srpChips: () => HTMLElement = () => new HTMLElement('[data-testid="recovery-phrase-chips"]');
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="recovery-phrase-next"]');
  /**
   * Creates an instance of ReviewRecoveryPhrase.
   * @memberof ReviewRecoveryPhrase
   */
  constructor() {
    super('/home.html#onboarding/review-recovery-phrase', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof ReviewRecoveryPhrase
   */
  async revealSecretRecoveryPhrase(): Promise<void> {
    return await this.revealButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<string>}
   * @memberof ReviewRecoveryPhrase
   */
  async getSRP(): Promise<string> {
    return await this.srpChips().getText();
  }
  /**
   *
   *
   * @return {*}  {Promise<ConfirmRecoveryPhrase>}
   * @memberof ReviewRecoveryPhrase
   */
  async next(): Promise<ConfirmRecoveryPhrase> {
    return await this.nextButton().click<ConfirmRecoveryPhrase>(ConfirmRecoveryPhrase);
  }
}
