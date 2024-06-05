import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class SignatureRequest extends PageObject implements IConfirmation {
  private scrollButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Scroll")]');
  private signButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Sign")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of SignatureRequest.
   * @memberof SignatureRequest
   */
  constructor() {
    super('html?templateType=dialog#/signTypedData', 'Zerion · Sign Typed Data');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof SignatureRequest
   */
  async accept<TPage>(page?: new () => TPage): Promise<void | TPage> {
    await this.scrollButton().clickAndWait();
    if (page) {
      return this.signButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.signButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof SignatureRequest
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
