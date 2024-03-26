import { HTMLElement } from '../../controls/html-element';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {PageObject}
 */
export class SignMessage extends PageObject {
  private signButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Sign")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super('html?templateType=dialog#/signMessage', 'Zerion · Sign Message');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof SignMessage
   */
  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignMessage
   */
  signAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.signButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
