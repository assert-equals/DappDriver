import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { Import } from '../..';

/**
 *
 *
 * @export
 * @class ImportOrConnect
 * @extends {PageObject}
 */
export class ImportOrConnect extends PageObject {
  private get importWithASRPOrPKButton(): HTMLElement {
    return new HTMLElement('[data-testid="import-wallet-option"]');
  }
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
    return await this.importWithASRPOrPKButton.clickRedirectsTo<Import>(Import);
  }
}
