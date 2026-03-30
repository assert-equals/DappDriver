import { HTMLElement, IConfirmation, IPageObject, PageObject } from '@assert-equals/dappdriver';

/**
 *
 *
 * @export
 * @class ConfirmAddSuggestedToken
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class ConfirmAddSuggestedToken extends PageObject implements IConfirmation {
  private get nextButton(): HTMLElement {
    return new HTMLElement('[data-testid="page-container-footer-next"]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="page-container-footer-cancel"]');
  }
  /**
   * Creates an instance of ConfirmAddSuggestedToken.
   * @memberof ConfirmAddSuggestedToken
   */
  constructor() {
    super('#/confirm-add-suggested-token', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmAddSuggestedToken
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
   * @memberof ConfirmAddSuggestedToken
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
