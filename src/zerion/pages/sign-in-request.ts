import { HTMLElement } from '../../controls/html-element';
import { IPageObject } from '../../interface/page/page-object';
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
  private get signInButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Sign")]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Cancel")]');
  }
  /**
   * Creates an instance of SignInRequest.
   * @memberof SignInRequest
   */
  constructor() {
    super('#/signMessage', 'Zerion · Sign Message');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignInRequest
   */
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.signInButton.clickAndOpensInWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignInRequest
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndOpensInWindow<TPage>(page);
  }
}
