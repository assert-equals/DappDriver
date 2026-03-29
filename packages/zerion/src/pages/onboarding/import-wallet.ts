import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { RecoveryPhrase } from './recovery-phrase';

/**
 *
 *
 * @export
 * @class ImportWallet
 * @extends {PageObject}
 */
export class ImportWallet extends PageObject {
  private get importRecoveryPhraseButton(): HTMLElement {
    return new HTMLElement('a[href="#/onboarding/import/mnemonic"]');
  }
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
    return await this.importRecoveryPhraseButton.clickRedirectsTo<RecoveryPhrase>(RecoveryPhrase);
  }
}
