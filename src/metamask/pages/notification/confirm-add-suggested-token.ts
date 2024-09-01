import { HTMLElement } from '../../../controls/html-element';
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
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');
  /**
   * Creates an instance of ConfirmAddSuggestedToken.
   * @memberof ConfirmAddSuggestedToken
   */
  constructor() {
    super('#confirm-add-suggested-token', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ConfirmAddSuggestedToken
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.nextButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ConfirmAddSuggestedToken
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton().click();
    }
  }
}
