import { HTMLElement } from '../../controls/html-element';
import { ISignatureRequest } from '../../interface/wallet/signature-request';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {PageObject}
 * @implements {ISignatureRequest}
 */
export class SignatureRequest extends PageObject implements ISignatureRequest {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    await this.scrollButton().click();
    return this.signButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
