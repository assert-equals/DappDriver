import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { CreatePassword } from './create-password';

/**
 *
 *
 * @export
 * @class ImportWithRecoveryPhrase
 * @extends {PageObject}
 */
export class ImportWithRecoveryPhrase extends PageObject {
  private srpInput: (index: number) => HTMLElement = (index: number) =>
    new HTMLElement(`[data-testid="import-srp__srp-word-${index}"]`);
  private confirmButton: () => HTMLElement = () => new HTMLElement('[data-testid="import-srp-confirm"]');
  /**
   * Creates an instance of ImportWithRecoveryPhrase.
   * @memberof ImportWithRecoveryPhrase
   */
  constructor() {
    super('/home.html#onboarding/import-with-recovery-phrase', 'MetaMask');
  }
  /**
   *
   *
   * @param {string} srp
   * @return {*}  {Promise<void>}
   * @memberof ImportWithRecoveryPhrase
   */
  async enterSRP(srp: string): Promise<void> {
    const words: Array<string> = srp.split(' ');
    for (const word of words) {
      await this.srpInput(words.indexOf(word)).type(word);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<CreatePassword>}
   * @memberof ImportWithRecoveryPhrase
   */
  confirmSecretRecoveryPhrase(): Promise<CreatePassword> {
    return this.confirmButton().click<CreatePassword>(CreatePassword);
  }
}
