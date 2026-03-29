import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { CreatePassword } from '../..';

/**
 *
 *
 * @export
 * @class ImportSelect
 * @extends {PageObject}
 */
export class ImportSelect extends PageObject {
  private get addWalletsButton(): HTMLElement {
    return new HTMLElement('[data-testid="add-wallets-button"]');
  }
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
    return await this.addWalletsButton.clickRedirectsTo<CreatePassword>(CreatePassword);
  }
}
