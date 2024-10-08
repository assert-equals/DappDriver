import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { RecoveryPhrase } from './recovery-phrase';

/**
 *
 *
 * @export
 * @class ImportWallet
 * @extends {PageObject}
 */
export class ImportWallet extends PageObject {
  private importRecoveryPhraseButton: () => HTMLElement = () =>
    new HTMLElement('a[href="#/onboarding/import/mnemonic"]');
  /**
   * Creates an instance of ImportWallet.
   * @memberof ImportWallet
   */
  constructor() {
    super('onboarding#/onboarding/import', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<RecoveryPhrase>}
   * @memberof ImportWallet
   */
  async importRecoveryPhrase(): Promise<RecoveryPhrase> {
    return await this.importRecoveryPhraseButton().click<RecoveryPhrase>(RecoveryPhrase);
  }
}
