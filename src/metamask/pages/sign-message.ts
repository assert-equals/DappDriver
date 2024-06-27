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
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/signature-request/), 'MetaMask');
  }
}
