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
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirm-footer-button"]');
  protected cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirm-footer-cancel-button"]');
  /**
   * Creates an instance of ApproveAll.
   * @memberof ApproveAll
   */
  constructor() {
    super(new RegExp(/#confirm-transaction/), 'MetaMask');
  }
}
