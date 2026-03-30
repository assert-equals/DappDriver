import { DappDriver, HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { CreatePassword } from '../..';

/**
 *
 *
 * @export
 * @class SeedVerify
 * @extends {PageObject}
 */
export class SeedVerify extends PageObject {
  private readonly seedWordLabel: (word: string) => HTMLElement = (word: string) =>
    new HTMLElement(`[data-testid="word_${word}"]`);
  /**
   * Creates an instance of SeedVerify.
   * @memberof SeedVerify
   */
  constructor() {
    super('/popup.html#/seed-verify', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @param {Array<string>} requiredWords
   * @return {*}  {Promise<CreatePassword>}
   * @memberof SeedVerify
   */
  async verify(requiredWords: Array<string>): Promise<CreatePassword> {
    for (const word of requiredWords) {
      await this.seedWordLabel(word).click();
    }
    return await DappDriver.getPage(CreatePassword);
  }
}
