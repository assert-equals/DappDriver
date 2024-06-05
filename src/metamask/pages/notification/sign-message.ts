import { ConfirmTransaction } from './confirm-transaction';
import { IConfirmation } from '../../../interface/wallet/confirmation';
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
