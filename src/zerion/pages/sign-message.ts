import { HTMLElement } from '../../controls/html-element';
import { ISignMessage } from '../../interface/wallet/sign-message';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {PageObject}
 * @implements {ISignMessage}
 */
export class SignMessage extends PageObject implements ISignMessage {
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
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignMessage
   */
  accept<TPage>(page: new () => TPage): Promise<TPage> {
    return this.signButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignMessage
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
