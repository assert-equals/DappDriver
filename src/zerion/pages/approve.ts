import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class Approve
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Approve extends PageObject implements IConfirmation {
  private confirmButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Confirm")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of Approve.
   * @memberof Approve
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
   * @memberof Approve
   */
  accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.confirmButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.confirmButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Approve
   */
  reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
