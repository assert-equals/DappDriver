import { RevealSeed } from '../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class SeedBackup
 * @extends {PageObject}
 */
export class SeedBackup extends PageObject {
  private revealYourRecoveryPhraseButton: () => HTMLElement = () =>
    new HTMLElement('[data-testid="show-recovery-phrase-button"]');
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
  revealYourRecoveryPhrase(): Promise<RevealSeed> {
    return this.revealYourRecoveryPhraseButton().click<RevealSeed>(RevealSeed);
  }
}
