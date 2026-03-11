import { HTMLElement } from '../../controls/html-element';
import { IPageObject } from '../../interface/page/page-object';
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    if (await this.scrollButton.isDisplayed()) {
      await this.scrollButton.clickAndWait();
    }
    return await this.signButton.clickAndSwitchToWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
