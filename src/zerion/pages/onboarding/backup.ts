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
    super('html?templateType=tab&context=onboarding#/onboarding/create/backup', 'Zerion');
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
   * @return {*}  {Promise<string>}
   * @memberof BackUp
   */
  getSeed(): Promise<string> {
    return this.seedLabel().getText();
  }
  /**
   *
   *
   * @return {*}  {Promise<Verify>}
   * @memberof BackUp
   */
  verifyBackup(): Promise<Verify> {
    return this.verifyBackUpButton().clickAndRedirectsTo<Verify>(Verify);
  }
}
