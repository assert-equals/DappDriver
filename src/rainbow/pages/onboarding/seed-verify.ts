import { CreatePassword } from '../..';
import { DappDriver } from '../../..';
import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class SeedVerify
 * @extends {PageObject}
 */
export class SeedVerify extends PageObject {
  private seedWordLabel: (word: string) => HTMLElement = (word: string) =>
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
    return DappDriver.getPage(CreatePassword);
  }
}
