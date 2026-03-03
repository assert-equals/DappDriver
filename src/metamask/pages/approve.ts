import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class Approve
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class Approve extends ConfirmTransaction implements IConfirmation {
  protected get nextButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-button"]');
  }
  protected get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-cancel-button"]');
  }
  /**
   * Creates an instance of Approve.
   * @memberof Approve
   */
  constructor() {
    super(new RegExp(/#confirm-transaction/), 'MetaMask');
  }
}
