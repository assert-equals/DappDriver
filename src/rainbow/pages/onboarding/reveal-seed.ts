import { HTMLElement } from '../../../controls';
import { PageObject } from '../../../page';
import { SeedVerify } from '../..';
/**
 *
 *
 * @export
 * @class RevealSeed
 * @extends {PageObject}
 */
export class RevealSeed extends PageObject {
  private seedWordLabel: (position: number) => HTMLElement = (position: number) =>
    new HTMLElement(`[data-testid="seed_word_${position}"]`);
  private iveSavedTheseWordsButton: () => HTMLElement = () =>
    new HTMLElement('[data-testid="saved-these-words-button"]');
  /**
   * Creates an instance of RevealSeed.
   * @memberof RevealSeed
   */
  constructor() {
    super('/popup.html#/seed-reveal', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<string>>}
   * @memberof RevealSeed
   */
  async getRequiredWords(): Promise<Array<string>> {
    const requiredWords: Array<string> = new Array<string>();
    for (const position of [4, 8, 12]) {
      const wordText = await this.seedWordLabel(position).getText();
      requiredWords.push(wordText);
    }
    return requiredWords;
  }
  /**
   *
   *
   * @return {*}  {Promise<SeedVerify>}
   * @memberof RevealSeed
   */
  iveSavedTheseWords(): Promise<SeedVerify> {
    return this.iveSavedTheseWordsButton().click<SeedVerify>(SeedVerify);
  }
}
