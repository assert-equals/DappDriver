import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Success } from './success';

/**
 *
 *
 * @export
 * @class Verify
 * @extends {PageObject}
 */
export class Verify extends PageObject {
  private readonly wordInput: (index: number) => HTMLElement = (index) => new HTMLElement(`#word-${index}`);
  private get verifyButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Verify")]');
  }
  /**
   * Creates an instance of Verify.
   * @memberof Verify
   */
  constructor() {
    super('onboarding#/onboarding/backup/verify-backup', 'Zerion');
  }
  /**
   *
   *
   * @param {number} index
   * @param {string} word
   * @return {*}  {Promise<void>}
   * @memberof Verify
   */
  async enterWord(index: number, word: string): Promise<void> {
    return await this.wordInput(index).type(word);
  }
  /**
   *
   *
   * @param {Array<string>} words
   * @return {*}  {Promise<void>}
   * @memberof Verify
   */
  async enterSeed(words: Array<string>): Promise<void> {
    for (const word of words) {
      await this.enterWord(words.indexOf(word), word);
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<Success>}
   * @memberof Verify
   */
  async verify(): Promise<Success> {
    return await this.verifyButton.click<Success>(Success);
  }
}
