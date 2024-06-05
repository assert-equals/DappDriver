import { ConfirmTransaction } from '.';
import { HTMLElement } from '../../../../controls/html-element';
import { IConfirmation } from '../../../../interface/wallet/confirmation';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class SignatureRequest extends ConfirmTransaction implements IConfirmation {
  private scrollButton: () => HTMLElement = () =>
    new HTMLElement('[data-testid="signature-request-scroll-button"]', 3000);
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
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof SignatureRequest
   */
  async accept<TPage>(page?: new () => TPage): Promise<void | TPage> {
    await this.scrollButton().clickAndWait();
    if (page) {
      return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.nextButton().click();
    }
  }
}
