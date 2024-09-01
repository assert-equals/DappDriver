import { ImportWallet, Password } from '../..';
import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Welcome
 * @extends {PageObject}
 */
export class Welcome extends PageObject {
  private createNewWalletButton: () => HTMLElement = () => new HTMLElement('a[href="#/onboarding/create"]');
  private importExistingWalletButton: () => HTMLElement = () => new HTMLElement('a[href="#/onboarding/import"]');
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
    return await this.createNewWalletButton().click<Password>(Password);
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportWallet>}
   * @memberof Welcome
   */
  async importExistingWallet(): Promise<ImportWallet> {
    return await this.importExistingWalletButton().click<ImportWallet>(ImportWallet);
  }
}
