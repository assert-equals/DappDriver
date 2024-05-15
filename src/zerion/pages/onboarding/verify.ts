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
  private wordInput: (index: Number) => HTMLElement = (index) => new HTMLElement(`#word-${index}`);
  private verifyButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Verify")]');
  /**
   * Creates an instance of Verify.
   * @memberof Verify
   */
  constructor() {
    super('html?templateType=tab&context=onboarding#/onboarding/create/verify', 'Zerion');
  }
  /**
   *
   *
   * @param {Number} index
   * @param {string} word
   * @return {*}  {Promise<void>}
   * @memberof Verify
   */
  enterWord(index: Number, word: string): Promise<void> {
    return this.wordInput(index).type(word);
  }
  /**
   *
   *
   * @return {*}  {Promise<Success>}
   * @memberof Verify
   */
  verify(): Promise<Success> {
    return this.verifyButton().clickAndRedirectsTo<Success>(Success);
  }
}
