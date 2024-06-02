import { HTMLElement, InputText } from '../../../controls';
import { PageObject } from '../../../page';
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
    super(new RegExp(/html\?templateType=tab&context=onboarding#\/onboarding\/.*view=password&step=confirm/), 'Zerion');
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
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmPassword
   */
  setPassword<TPage>(page: new () => TPage): Promise<TPage> {
    return this.setPasswordButton().clickAndRedirectsTo<TPage>(page);
  }
}
