import { ConfirmTransaction } from '.';
import { HTMLElement } from '../../../../controls/html-element';
import { ISignatureRequest } from '../../../../interface/wallet/signature-request';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {ConfirmTransaction}
 * @implements {ISignatureRequest}
 */
export class SignatureRequest extends ConfirmTransaction implements ISignatureRequest {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  async accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.scrollButton().clickAndWait();
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
