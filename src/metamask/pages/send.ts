import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class Send
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class Send extends ConfirmTransaction implements IConfirmation {
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  protected cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');
  /**
   * Creates an instance of Send.
   * @memberof Send
   */
  constructor() {
    super(new RegExp(/#confirm-transaction/), 'MetaMask');
  }
}
