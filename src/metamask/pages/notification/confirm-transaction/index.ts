import { HTMLElement } from '../../../../controls/html-element';
import { IConfirmation } from '../../../../interface/wallet/confirmation';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class ConfirmTransaction extends PageObject implements IConfirmation {
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  protected cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');
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
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof ConfirmTransaction
   */
  accept<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.nextButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof ConfirmTransaction
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
