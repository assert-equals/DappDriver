import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { RevealSeed } from '../..';

/**
 *
 *
 * @export
 * @class SeedBackup
 * @extends {PageObject}
 */
export class SeedBackup extends PageObject {
  private get revealYourRecoveryPhraseButton(): HTMLElement {
    return new HTMLElement('[data-testid="show-recovery-phrase-button"]');
  }
  /**
   * Creates an instance of SeedBackup.
   * @memberof SeedBackup
   */
  constructor() {
    super('/popup.html#/seed-backup-prompt', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<RevealSeed>}
   * @memberof SeedBackup
   */
  async revealYourRecoveryPhrase(): Promise<RevealSeed> {
    return await this.revealYourRecoveryPhraseButton.clickRedirectsTo<RevealSeed>(RevealSeed);
  }
}
