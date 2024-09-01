import { ImportOrConnect, SeedBackup } from '../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Welcome
 * @extends {PageObject}
 */
export class Welcome extends PageObject {
  private createANewWalletButton: () => HTMLElement = () => new HTMLElement('[data-testid="create-wallet-button"]');
  private importOrConnectAWalletButton: () => HTMLElement = () =>
    new HTMLElement('[data-testid="import-wallet-button"]');
  /**
   * Creates an instance of Welcome.
   * @memberof Welcome
   */
  constructor() {
    super('/popup.html#/welcome', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<SeedBackup>}
   * @memberof Welcome
   */
  async createANewWallet(): Promise<SeedBackup> {
    return await this.createANewWalletButton().click<SeedBackup>(SeedBackup);
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportOrConnect>}
   * @memberof Welcome
   */
  async importOrConnectAWallet(): Promise<ImportOrConnect> {
    return await this.importOrConnectAWalletButton().click<ImportOrConnect>(ImportOrConnect);
  }
}
