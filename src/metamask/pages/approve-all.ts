import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class ApproveAll
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class ApproveAll extends ConfirmTransaction implements IConfirmation {
  protected get nextButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-button"]');
  }
  protected get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-footer-cancel-button"]');
  }
  /**
   * Creates an instance of ApproveAll.
   * @memberof ApproveAll
   */
  constructor() {
    super('#/confirm-transaction', 'MetaMask');
  }
}
