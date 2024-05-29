import { HTMLElement, InputText } from '../../../controls';
import { PageObject } from '../../../page';
import { Ready } from '../..';
/**
 *
 *
 * @export
 * @class CreatePassword
 * @extends {PageObject}
 */
export class CreatePassword extends PageObject {
  private passwordInput: () => InputText = () => new InputText('[data-testid="password-input"]');
  private confirmPasswordInput: () => InputText = () => new InputText('[data-testid="confirm-password-input"]');
  private setPasswordButton: () => HTMLElement = () => new HTMLElement('[data-testid="set-password-button"]');
  /**
   * Creates an instance of CreatePassword.
   * @memberof CreatePassword
   */
  constructor() {
    super('/popup.html#/create-password', 'Rainbow Wallet');
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  confirmPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.confirmPasswordInput().type(password);
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  enterPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.passwordInput().type(password);
  }
  /**
   *
   *
   * @return {*}  {Promise<Ready>}
   * @memberof CreatePassword
   */
  setPassword(): Promise<Ready> {
    return this.setPasswordButton().clickAndRedirectsTo<Ready>(Ready);
  }
}
