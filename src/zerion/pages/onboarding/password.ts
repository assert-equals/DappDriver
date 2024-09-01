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
    super(new RegExp(/onboarding#\/onboarding\/.*password/), 'Zerion');
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof Password
   */
  async password(password: string = 'P@ssword01!'): Promise<void> {
    return await this.passwordField().type(password);
  }
  /**
   *
   *
   * @return {*}  {Promise<ConfirmPassword>}
   * @memberof Password
   */
  async confirmPassword(): Promise<ConfirmPassword> {
    return await this.confirmButton().click<ConfirmPassword>(ConfirmPassword);
  }
}
