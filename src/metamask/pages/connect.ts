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
  protected get nextButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirm-btn"]');
  }
  protected get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="cancel-btn"]');
  }
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super('#/connect', 'MetaMask');
  }
}
