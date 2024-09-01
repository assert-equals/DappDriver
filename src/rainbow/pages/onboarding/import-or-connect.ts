import { Import } from '../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class ImportOrConnect
 * @extends {PageObject}
 */
export class ImportOrConnect extends PageObject {
  private importWithASRPOrPKButton: () => HTMLElement = () => new HTMLElement('[data-testid="import-wallet-option"]');
  /**
   * Creates an instance of ImportOrConnect.
   * @memberof ImportOrConnect
   */
  constructor() {
    super('/popup.html#/import-or-connect', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<Import>}
   * @memberof ImportOrConnect
   */
  async importWithASecretRecoveryPhraseOrPrivateKey(): Promise<Import> {
    return await this.importWithASRPOrPKButton().click<Import>(Import);
  }
}
