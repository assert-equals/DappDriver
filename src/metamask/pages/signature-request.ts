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
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirm-footer-button"]');
  private scrollButton: () => HTMLElement = () => new HTMLElement('[aria-label="Scroll down"]', 3000);
  /**
   * Creates an instance of SignatureRequest.
   * @memberof SignatureRequest
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/signature-request/), 'MetaMask');
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
    await this.scrollButton().clickAndWait();
    if (page) {
      return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.nextButton().click();
    }
  }
}
