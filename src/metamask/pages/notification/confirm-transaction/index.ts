import { HTMLElement } from '../../../../controls/html-element';
import { IConfirmTransaction } from '../../../../interface/wallet/confirm-transaction';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @extends {PageObject}
 * @implements {IConfirmTransaction}
 */
export class ConfirmTransaction extends PageObject implements IConfirmTransaction {
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  protected cencelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmTransaction
   */
  accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmTransaction
   */
  reject<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
