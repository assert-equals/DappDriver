import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { ImportWallet, Password } from '../..';

/**
 *
 *
 * @export
 * @class Welcome
 * @extends {PageObject}
 */
export class Welcome extends PageObject {
  private get createNewWalletButton(): HTMLElement {
    return new HTMLElement('a[href="#/onboarding/create"]');
  }
  private get importExistingWalletButton(): HTMLElement {
    return new HTMLElement('a[href="#/onboarding/import"]');
  }
  /**
   * Creates an instance of Welcome.
   * @memberof Welcome
   */
  constructor() {
    super('onboarding#/onboarding', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<Password>}
   * @memberof Welcome
   */
  async createNewWallet(): Promise<Password> {
    return await this.createNewWalletButton.clickRedirectsTo<Password>(Password);
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportWallet>}
   * @memberof Welcome
   */
  async importExistingWallet(): Promise<ImportWallet> {
    return await this.importExistingWalletButton.clickRedirectsTo<ImportWallet>(ImportWallet);
  }
}
