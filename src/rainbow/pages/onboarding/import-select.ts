import { CreatePassword } from '../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

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
  async importWalletGroup(): Promise<CreatePassword> {
    return await this.addWalletsButton().click<CreatePassword>(CreatePassword);
  }
}
