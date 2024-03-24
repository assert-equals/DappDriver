import { ConfirmTransaction } from '.';
import { HTMLElement } from '../../../../controls/html-element';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {ConfirmTransaction}
 */
export class SignatureRequest extends ConfirmTransaction {
  private scrollButton: () => HTMLElement = () => new HTMLElement('[data-testid="signature-request-scroll-button"]');
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
   * @return {*}  {Promise<void>}
   * @memberof SignatureRequest
   */
  scroll(): Promise<void> {
    return this.scrollButton().click();
  }
}
