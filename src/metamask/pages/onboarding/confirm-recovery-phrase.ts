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
   * @param {string} word
   * @return {*}  {Promise<void>}
   * @memberof ConfirmRecoveryPhrase
   */
  enterWord(index: number, word: string): Promise<void> {
    return this.chipInput(index).type(word);
  }
  /**
   *
   *
   * @return {*}  {Promise<Completion>}
   * @memberof ConfirmRecoveryPhrase
   */
  confirm(): Promise<Completion> {
    return this.confirmButton().click<Completion>(Completion);
  }
}
