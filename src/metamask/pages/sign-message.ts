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
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/signature-request/), 'MetaMask');
  }
}
