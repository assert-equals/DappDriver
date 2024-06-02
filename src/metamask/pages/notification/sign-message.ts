import { ConfirmTransaction } from './confirm-transaction';
import { ISignMessage } from '../../../interface/wallet/sign-message';
/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {ConfirmTransaction}
 * @implements {ISignMessage}
 */
export class SignMessage extends ConfirmTransaction implements ISignMessage {
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/signature-request/), 'MetaMask');
  }
}
