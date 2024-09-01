import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Connect extends PageObject implements IConfirmation {
  private connectButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Connect")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super('#/requestAccounts', 'Zerion · Connect Wallet');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Connect
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.connectButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.connectButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Connect
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton().click();
    }
  }
}
