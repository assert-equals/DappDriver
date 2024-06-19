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
  createNewWallet(): Promise<Password> {
    return this.createNewWalletButton().click<Password>(Password);
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportWallet>}
   * @memberof Welcome
   */
  importExistingWallet(): Promise<ImportWallet> {
    return this.importExistingWalletButton().click<ImportWallet>(ImportWallet);
  }
}
