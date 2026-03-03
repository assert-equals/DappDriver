import { HTMLElement } from '../../controls/html-element';
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
    super(new RegExp(/#confirm-transaction/), 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (await this.scrollButton.isDisplayed()) {
      await this.scrollButton.clickAndWait();
    }
    if (page) {
      return await this.nextButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.nextButton.click();
    }
  }
}
