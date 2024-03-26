import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { ImportWallet } from './import-wallet';
/**
 *
 *
 * @export
 * @class Welcome
 * @extends {PageObject}
 */
export class Welcome extends PageObject {
  private importExistingWalletButton: () => HTMLElement = () => new HTMLElement('a[href="#/onboarding/import"]');
  /**
   * Creates an instance of Welcome.
   * @memberof Welcome
   */
  constructor() {
    super('html?templateType=tab&context=onboarding#/onboarding', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportWallet>}
   * @memberof Welcome
   */
  importExistingWallet(): Promise<ImportWallet> {
    return this.importExistingWalletButton().clickAndRedirectsTo<ImportWallet>(ImportWallet);
  }
}
