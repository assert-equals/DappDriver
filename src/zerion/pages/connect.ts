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
  accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.connectButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.connectButton().click();
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
  reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
