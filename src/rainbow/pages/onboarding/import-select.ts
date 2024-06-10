import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';
import { CreatePassword } from '../..';
/**
 *
 *
 * @export
 * @class ImportSelect
 * @extends {PageObject}
 */
export class ImportSelect extends PageObject {
  private addWalletsButton: () => HTMLElement = () => new HTMLElement('[data-testid="add-wallets-button"]');
  /**
   * Creates an instance of ImportSelect.
   * @memberof ImportSelect
   */
  constructor() {
    super('/popup.html#/import/select', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<CreatePassword>}
   * @memberof ImportSelect
   */
  importWalletGroup(): Promise<CreatePassword> {
    return this.addWalletsButton().click<CreatePassword>(CreatePassword);
  }
}
