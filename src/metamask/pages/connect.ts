import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Connect extends ConfirmTransaction implements IConfirmation {
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirm-btn"]');
  protected cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="cancel-btn"]');
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super('/notification.html#connect', 'MetaMask');
  }
}
