import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { BackUpRecoveryPhrase } from './backup-recovery-phrase';

/**
 *
 *
 * @export
 * @class BackUp
 * @extends {PageObject}
 */
export class BackUp extends PageObject {
  private get continueButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Continue")]');
  }
  private get backUpNowButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Back up now")]');
  }
  /**
   * Creates an instance of BackUp.
   * @memberof BackUp
   */
  constructor() {
    super('onboarding#/onboarding/backup', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof BackUp
   */
  async continue(): Promise<void> {
    return await this.continueButton.clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<BackUpRecoveryPhrase>}
   * @memberof BackUp
   */
  async backUpNow(): Promise<BackUpRecoveryPhrase> {
    return await this.backUpNowButton.click<BackUpRecoveryPhrase>(BackUpRecoveryPhrase);
  }
}
