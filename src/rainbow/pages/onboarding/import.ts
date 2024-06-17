import { ImportSeed } from '../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Import
 * @extends {PageObject}
 */
export class Import extends PageObject {
  private importFromASRPButton: () => HTMLElement = () => new HTMLElement('[data-testid="import-via-seed-option"]');
  /**
   * Creates an instance of Import.
   * @memberof Import
   */
  constructor() {
    super('/popup.html#/import', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportSeed>}
   * @memberof Import
   */
  importFromASecretRecoveryPhrase(): Promise<ImportSeed> {
    return this.importFromASRPButton().click<ImportSeed>(ImportSeed);
  }
}
