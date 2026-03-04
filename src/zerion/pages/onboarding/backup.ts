import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Verify } from './verify';

/**
 *
 *
 * @export
 * @class BackUp
 * @extends {PageObject}
 */
export class BackUp extends PageObject {
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
   * Creates an instance of BackUp.
   * @memberof BackUp
   */
  constructor() {
    super('onboarding#/onboarding/create/backup', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof BackUp
   */
  async reveal(): Promise<void> {
    return await this.revealButton.clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<string>>}
   * @memberof BackUp
   */
  async getSeed(): Promise<Array<string>> {
    const seedPhrase: string = await this.seedLabel.getText();
    return seedPhrase.split(' ');
  }
  /**
   *
   *
   * @return {*}  {Promise<Verify>}
   * @memberof BackUp
   */
  async verifyBackup(): Promise<Verify> {
    return await this.verifyBackUpButton.click<Verify>(Verify);
  }
}
