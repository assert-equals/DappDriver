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
  private revealButton: () => HTMLElement = () => new HTMLElement('button[type="button"]');
  private seedLabel: () => HTMLElement = () =>
    new HTMLElement('xpath=//div[contains(@class, "CaYX_a_zstack")]//div[contains(@class, "_uitext_tij8c_1")]');
  private verifyBackUpButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Verify Backup")]');
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
  reveal(): Promise<void> {
    return this.revealButton().clickAndWait();
  }
  /**
   *
   *
   * @return {*}  {Promise<Array<string>>}
   * @memberof BackUp
   */
  async getSeed(): Promise<Array<string>> {
    const seedPhrase: string = await this.seedLabel().getText();
    return seedPhrase.split(' ');
  }
  /**
   *
   *
   * @return {*}  {Promise<Verify>}
   * @memberof BackUp
   */
  verifyBackup(): Promise<Verify> {
    return this.verifyBackUpButton().click<Verify>(Verify);
  }
}
