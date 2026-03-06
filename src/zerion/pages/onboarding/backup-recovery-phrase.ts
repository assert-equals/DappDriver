import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Verify } from './verify';

/**
 *
 *
 * @export
 * @class BackUpRecoveryPhrase
 * @extends {PageObject}
 */
export class BackUpRecoveryPhrase extends PageObject {
  private get revealButton(): HTMLElement {
    return new HTMLElement('button[type="button"]');
  }
  private get seedLabel(): HTMLElement {
    return new HTMLElement('xpath=//div[contains(@class, "CaYX_a_zstack")]//div[contains(@class, "_uitext_tij8c_1")]');
  }
  private get verifyBackUpButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Verify Backup")]');
  }
  /**
   * Creates an instance of BackUpRecoveryPhrase.
   * @memberof BackUpRecoveryPhrase
   */
  constructor() {
    super('onboarding#/onboarding/backup/recovery-phrase', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof BackUpRecoveryPhrase
   */
  async reveal(): Promise<void> {
    return await this.revealButton.clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<string>>}
   * @memberof BackUpRecoveryPhrase
   */
  async getSeed(): Promise<Array<string>> {
    const seedPhrase: string = await this.seedLabel.getText();
    return seedPhrase.split(' ');
  }
  /**
   *
   *
   * @return {*}  {Promise<Verify>}
   * @memberof BackUpRecoveryPhrase
   */
  async verify(): Promise<Verify> {
    return await this.verifyBackUpButton.click<Verify>(Verify);
  }
}
