import { HTMLElement } from '../../controls/html-element';
import { IConfirmTransaction } from '../../interface/wallet/confirm-transaction';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SendTransaction
 * @extends {PageObject}
 * @implements {IConfirmTransaction}
 */
export class SendTransaction extends PageObject implements IConfirmTransaction {
  private confirmButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Confirm")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of SendTransaction.
   * @memberof SendTransaction
   */
  constructor() {
    super('html?templateType=dialog#/sendTransaction', 'Zerion · Send Transaction');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SendTransaction
   */
  accept<TPage>(page: new () => TPage): Promise<TPage> {
    return this.confirmButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SendTransaction
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
