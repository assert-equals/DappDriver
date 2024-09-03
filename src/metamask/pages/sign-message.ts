import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class SignMessage extends ConfirmTransaction implements IConfirmation {
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirm-footer-button"]');
  private scrollButton: () => HTMLElement = () => new HTMLElement('[aria-label="Scroll down"]', 8000);
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
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
   * @memberof SignMessage
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (await this.scrollButton().isDisplayed()) {
      await this.scrollButton().clickAndWait();
    }
    if (page) {
      return await this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.nextButton().click();
    }
  }
}
