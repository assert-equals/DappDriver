import { HTMLElement, InputText } from '../../../controls';
import { PageObject } from '../../../page';
import { ImportSelect } from '../..';
/**
 *
 *
 * @export
 * @class ImportSeed
 * @extends {PageObject}
 */
export class ImportSeed extends PageObject {
  private secretInput: (position: number) => InputText = (position: number) =>
    new InputText(`[data-testid="secret-input-${position}"]`);
  private importWalletsButton: () => HTMLElement = () => new HTMLElement('[data-testid="import-wallets-button"]');
  /**
   * Creates an instance of ImportSeed.
   * @memberof ImportSeed
   */
  constructor() {
    super('/popup.html#/import/seed?onboarding=true', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @param {string} srp
   * @return {*}  {Promise<void>}
   * @memberof ImportSeed
   */
  async enterSRP(srp: string): Promise<void> {
    const words: Array<string> = srp.split(' ');
    for (let index = 0; index < words.length; index++) {
      const position = index + 1;
      await this.secretInput(position).type(words[index]);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportSelect>}
   * @memberof ImportSeed
   */
  importWalletGroup(): Promise<ImportSelect> {
    return this.importWalletsButton().clickAndRedirectsTo<ImportSelect>(ImportSelect);
  }
}
