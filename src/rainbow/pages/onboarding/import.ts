import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';
import { ImportSeed } from '../..';
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
    return this.importFromASRPButton().clickAndRedirectsTo<ImportSeed>(ImportSeed);
  }
}
