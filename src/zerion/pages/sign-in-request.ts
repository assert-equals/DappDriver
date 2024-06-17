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
    super('html?templateType=dialog#/siwe', 'Zerion · Sign In with Ethereum');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignInRequest
   */
  accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.signInButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.signInButton().click();
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
  reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
