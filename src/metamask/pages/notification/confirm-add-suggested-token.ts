import { HTMLElement } from '../../../controls/html-element';
import { IPageObject } from '../../../interface/page/page-object';
import { IConfirmation } from '../../../interface/wallet/confirmation';
import { PageObject } from '../../../page';

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
