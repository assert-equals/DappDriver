import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class SendTransaction
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class SendTransaction extends PageObject implements IConfirmation {
  private confirmButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Confirm")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of SendTransaction.
   * @memberof SendTransaction
   */
  constructor() {
    super('#/sendTransaction', 'Zerion · Send Transaction');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SendTransaction
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.confirmButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.confirmButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SendTransaction
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton().click();
    }
  }
}
