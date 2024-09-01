import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class SignInRequest
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class SignInRequest extends PageObject implements IConfirmation {
  private signInButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Sign In")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of SignInRequest.
   * @memberof SignInRequest
   */
  constructor() {
    super('#/siwe', 'Zerion · Sign In with Ethereum');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignInRequest
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.signInButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.signInButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignInRequest
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton().click();
    }
  }
}
