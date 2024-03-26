import { InputText } from '../../../controls/input-text';
import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Success } from './success';
/**
 *
 *
 * @export
 * @class ConfirmPassword
 * @extends {PageObject}
 */
export class ConfirmPassword extends PageObject {
  private confirmPasswordField: () => InputText = () => new InputText('input[name="confirmPassword"]');
  private setPasswordButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Set Password")]');
  /**
   * Creates an instance of ConfirmPassword.
   * @memberof ConfirmPassword
   */
  constructor() {
    super('html?templateType=tab&context=onboarding#/onboarding/import/mnemonic?view=password&step=confirm', 'Zerion');
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof ConfirmPassword
   */
  confirmPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.confirmPasswordField().type(password);
  }
  /**
   *
   *
   * @return {*}  {Promise<Success>}
   * @memberof ConfirmPassword
   */
  setPassword(): Promise<Success> {
    return this.setPasswordButton().clickAndRedirectsTo<Success>(Success);
  }
}
