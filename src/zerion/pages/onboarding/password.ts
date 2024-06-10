import { HTMLElement, InputText } from '../../../controls';
import { PageObject } from '../../../page';
import { ConfirmPassword } from './confirm-password';
/**
 *
 *
 * @export
 * @class Password
 * @extends {PageObject}
 */
export class Password extends PageObject {
  private passwordField: () => InputText = () => new InputText('input[name="password"]');
  private confirmButton: () => HTMLElement = () => new HTMLElement('xpath=//span[contains(., "Confirm Password")]');
  /**
   * Creates an instance of Password.
   * @memberof Password
   */
  constructor() {
    super(new RegExp(/html\?templateType=tab&context=onboarding#\/onboarding\/.*password/), 'Zerion');
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof Password
   */
  password(password: string = 'P@ssword01!'): Promise<void> {
    return this.passwordField().type(password);
  }
  /**
   *
   *
   * @return {*}  {Promise<ConfirmPassword>}
   * @memberof Password
   */
  confirmPassword(): Promise<ConfirmPassword> {
    return this.confirmButton().click<ConfirmPassword>(ConfirmPassword);
  }
}
