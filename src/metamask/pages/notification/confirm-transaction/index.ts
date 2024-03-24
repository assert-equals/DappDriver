import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @extends {PageObject}
 */
export class ConfirmTransaction extends PageObject {
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
   * @return {*}
   * @memberof ConfirmTransaction
   */
  nextAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfirmTransaction
   */
  next(): Promise<void> {
    return this.nextButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfirmTransaction
   */
  cancel(): Promise<void> {
    return this.cencelButton().click();
  }
}
