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
    super('html?templateType=tab&context=onboarding#/onboarding/import/mnemonic?view=select-wallets', 'Zerion');
  }
  /**
   *
   *
   * @param {number} index
   * @return {*}  {Promise<void>}
   * @memberof SelectWallets
   */
  selectWallet(index: number): Promise<void> {
    return this.activeWalletButton(index).click();
  }
  /**
   *
   *
   * @return {*}  {Promise<Password>}
   * @memberof SelectWallets
   */
  continue(): Promise<Password> {
    return this.continueButton().click<Password>(Password);
  }
}
