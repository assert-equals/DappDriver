import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class ConfirmAddSuggestedToken
 * @extends {PageObject}
 */
export class ConfirmAddSuggestedToken extends PageObject {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmAddSuggestedToken
   */
  nextAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage> {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfirmAddSuggestedToken
   */
  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
}
