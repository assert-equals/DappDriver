import { HTMLElement, InputText } from '../../../controls';
import { PageObject } from '../../../page';
import { SelectWallets } from './select-wallets';

/**
 *
 *
 * @export
 * @class RecoveryPhrase
 * @extends {PageObject}
 */
export class RecoveryPhrase extends PageObject {
  private srpInput: (index: number) => InputText = (index: number) => new InputText(`#word-${index}`);
  private importWalletButton: () => HTMLElement = () => new HTMLElement('form button:nth-of-type(2)');
  /**
   * Creates an instance of RecoveryPhrase.
   * @memberof RecoveryPhrase
   */
  constructor() {
    super('onboarding#/onboarding/import/mnemonic', 'Zerion');
  }
  /**
   *
   *
   * @param {string} srp
   * @return {*}  {Promise<void>}
   * @memberof RecoveryPhrase
   */
  async enterSRP(srp: string): Promise<void> {
    const words: Array<string> = srp.split(' ');
    for (const word of words) {
      await this.srpInput(words.indexOf(word)).type(word);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<SelectWallets>}
   * @memberof RecoveryPhrase
   */
  async confirmSecretRecoveryPhrase(): Promise<SelectWallets> {
    return await this.importWalletButton().click<SelectWallets>(SelectWallets);
  }
}
