import { HTMLElement } from '../../controls/html-element';
import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class SignatureRequest extends ConfirmTransaction implements IConfirmation {
  protected get nextButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-button"]');
  }
  protected get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-cancel-button"]');
  }
  private get scrollButton(): HTMLElement {
    return new HTMLElement('[aria-label="Scroll down"]', 8000);
  }
  /**
   * Creates an instance of SignatureRequest.
   * @memberof SignatureRequest
   */
  constructor() {
    super('#/confirm-transaction', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    if (await this.scrollButton.isDisplayed()) {
      await this.scrollButton.clickAndWait();
    }
    return await this.nextButton.clickAndOpensInWindow<TPage>(page);
  }
}
