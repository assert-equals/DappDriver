import { HTMLElement, IConfirmation, IPageObject, PageObject } from '@assert-equals/dappdriver';

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
  constructor(url: string | RegExp = '#/confirm-transaction', title: string = 'MetaMask') {
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
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.nextButton.clickAndSwitchToWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmTransaction
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
