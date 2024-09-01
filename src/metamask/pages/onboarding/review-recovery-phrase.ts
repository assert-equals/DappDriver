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
   * @return {*}  {Promise<Array<string>>}
   * @memberof ReviewRecoveryPhrase
   */
  async getSRP(): Promise<Array<string>> {
    const recoveryPhrase: string = await this.srpChips().getText();
    const words: Array<string> = recoveryPhrase.split(/\s*(?:[0-9)]+|\n|\.|^$|$)\s*/u);
    return words.filter((str) => str !== '');
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
