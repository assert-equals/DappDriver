import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { BackUp } from './backup';

/**
 *
 *
 * @export
 * @class Information
 * @extends {PageObject}
 */
export class Information extends PageObject {
  private get continueButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Continue")]');
  }
  private get backUpNowButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Back up now")]');
  }
  /**
   * Creates an instance of Information.
   * @memberof Information
   */
  constructor() {
    super('onboarding#/onboarding/create/info', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Information
   */
  async stepOne(): Promise<void> {
    return await this.continueButton.clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Information
   */
  async stepTwo(): Promise<void> {
    return await this.continueButton.clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<BackUp>}
   * @memberof Information
   */
  async backUpNow(): Promise<BackUp> {
    return await this.backUpNowButton.click<BackUp>(BackUp);
  }
}
