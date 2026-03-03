import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class ConfirmTransaction extends PageObject implements IConfirmation {
  protected get nextButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-button"]');
  }
  protected get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-cancel-button"]');
  }
  /**
   * Creates an instance of ConfirmTransaction.
   * @param {(string | RegExp)} [url='#confirm-transaction']
   * @param {string} [title='MetaMask']
   * @memberof ConfirmTransaction
   */
  constructor(url: string | RegExp = '#confirm-transaction', title: string = 'MetaMask') {
    super(url, title);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ConfirmTransaction
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.nextButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.nextButton.click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ConfirmTransaction
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton.click();
    }
  }
}
