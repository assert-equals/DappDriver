import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class SignMessage extends PageObject implements IConfirmation {
  private signButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Sign")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super('#/signMessage', 'Zerion · Sign Message');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignMessage
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.signButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.signButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignMessage
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton().click();
    }
  }
}
