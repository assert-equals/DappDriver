import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Password } from './password';

/**
 *
 *
 * @export
 * @class SelectWallets
 * @extends {PageObject}
 */
export class SelectWallets extends PageObject {
  private activeWalletButton: (index: number) => HTMLElement = (index: number) =>
    new HTMLElement(`div[title="Derivation path: m/44'/60'/0'/0/${index}"]`);
  private continueButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Continue")]');
  /**
   * Creates an instance of SelectWallets.
   * @memberof SelectWallets
   */
  constructor() {
    super('onboarding#/onboarding/import/mnemonic?view=select-wallets', 'Zerion');
  }
  /**
   *
   *
   * @param {number} index
   * @return {*}  {Promise<void>}
   * @memberof SelectWallets
   */
  async selectWallet(index: number): Promise<void> {
    return await this.activeWalletButton(index).click();
  }
  /**
   *
   *
   * @return {*}  {Promise<Password>}
   * @memberof SelectWallets
   */
  async continue(): Promise<Password> {
    return await this.continueButton().click<Password>(Password);
  }
}
