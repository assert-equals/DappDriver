import { Metametrics } from '../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class ConfirmRecoveryPhrase
 * @extends {PageObject}
 */
export class ConfirmRecoveryPhrase extends PageObject {
  private readonly unansweredChip: (index: number) => HTMLElement = (index) =>
    new HTMLElement(`[data-testid="recovery-phrase-quiz-unanswered-${index}"]`);
  private get srpChips(): HTMLElement {
    return new HTMLElement('[data-testid="recovery-phrase-chips"]');
  }
  private get confirmButton(): HTMLElement {
    return new HTMLElement('[data-testid="recovery-phrase-confirm"]');
  }
  private get modalButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-srp-modal-button"]');
  }
  /**
   * Creates an instance of ConfirmRecoveryPhrase.
   * @memberof ConfirmRecoveryPhrase
   */
  constructor() {
    super('/home.html#/onboarding/confirm-recovery-phrase', 'MetaMask');
  }
  /**
   *
   *
   * @param {number} index
   * @return {*}  {Promise<void>}
   * @memberof ConfirmRecoveryPhrase
   */
  async confirmWord(index: number): Promise<void> {
    return await this.unansweredChip(index).click();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfirmRecoveryPhrase
   */
  async confirmRequiredWords(): Promise<void> {
    const quizJson = await this.srpChips.getAttribute('data-quiz-words');
    const quizWords: Array<{ index: number; word: string }> = JSON.parse(quizJson);
    const sortedIndices = quizWords.map((w) => w.index).sort((a, b) => a - b);
    for (const index of sortedIndices) {
      await this.confirmWord(index);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<Metametrics>}
   * @memberof ConfirmRecoveryPhrase
   */
  async confirm(): Promise<Metametrics> {
    await this.confirmButton.click();
    return await this.modalButton.click<Metametrics>(Metametrics);
  }
}
