import { HTMLElement } from '../../controls/html-element';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {PageObject}
 */
export class SignatureRequest extends PageObject {
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
   * @return {*}  {Promise<void>}
   * @memberof SignatureRequest
   */
  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof SignatureRequest
   */
  scroll(): Promise<void> {
    return this.scrollButton().click();
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  signAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.signButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
