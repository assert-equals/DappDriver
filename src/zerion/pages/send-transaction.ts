import { HTMLElement } from '../../controls/html-element';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class SendTransaction
 * @extends {PageObject}
 */
export class SendTransaction extends PageObject {
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
   * @return {*}  {Promise<void>}
   * @memberof SendTransaction
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
   * @memberof SendTransaction
   */
  confirmAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.confirmButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
