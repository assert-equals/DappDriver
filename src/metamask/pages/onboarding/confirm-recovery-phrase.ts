import { HTMLElement, InputText } from '../../../controls';
import { PageObject } from '../../../page';
import { Completion } from './completion';

/**
 *
 *
 * @export
 * @class ConfirmRecoveryPhrase
 * @extends {PageObject}
 */
export class ConfirmRecoveryPhrase extends PageObject {
  private chipInput: (index: number) => InputText = (index) =>
    new InputText(`[data-testid="recovery-phrase-input-${index}"]`);
  private confirmButton: () => HTMLElement = () => new HTMLElement('[data-testid="recovery-phrase-confirm"]');
  /**
   * Creates an instance of ConfirmRecoveryPhrase.
   * @memberof ConfirmRecoveryPhrase
   */
  constructor() {
    super('/home.html#onboarding/confirm-recovery-phrase', 'MetaMask');
  }
  /**
   *
   *
   * @param {number} index
   * @param {Array<string>} words
   * @return {*}  {Promise<void>}
   * @memberof ConfirmRecoveryPhrase
   */
  async enterWord(index: number, words: Array<string>): Promise<void> {
    return await this.chipInput(index).type(words[index]);
  }
  /**
   *
   *
   * @param {Array<string>} words
   * @return {*}  {Promise<void>}
   * @memberof ConfirmRecoveryPhrase
   */
  async enterRequiredWords(words: Array<string>): Promise<void> {
    await this.enterWord(2, words);
    await this.enterWord(3, words);
    await this.enterWord(7, words);
  }
  /**
   *
   *
   * @return {*}  {Promise<Completion>}
   * @memberof ConfirmRecoveryPhrase
   */
  async confirm(): Promise<Completion> {
    return await this.confirmButton().click<Completion>(Completion);
  }
}
