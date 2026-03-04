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
  private get scrollButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Scroll")]');
  }
  private get signButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Sign")]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Cancel")]');
  }
  /**
   * Creates an instance of SignatureRequest.
   * @memberof SignatureRequest
   */
  constructor() {
    super('#/signTypedData', 'Zerion · Sign Typed Data');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (await this.scrollButton.isDisplayed()) {
      await this.scrollButton.clickAndWait();
    }
    if (page) {
      return await this.signButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.signButton.click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton.click();
    }
  }
}
