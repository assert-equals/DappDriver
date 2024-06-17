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
  private continueButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Continue")]');
  private backUpNowButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Back up now")]');
  /**
   * Creates an instance of Information.
   * @memberof Information
   */
  constructor() {
    super('html?templateType=tab&context=onboarding#/onboarding/create/info', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Information
   */
  stepOne(): Promise<void> {
    return this.continueButton().clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Information
   */
  stepTwo(): Promise<void> {
    return this.continueButton().clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<BackUp>}
   * @memberof Information
   */
  backUpNow(): Promise<BackUp> {
    return this.backUpNowButton().click<BackUp>(BackUp);
  }
}
