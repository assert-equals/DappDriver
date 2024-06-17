import { IConfirmation } from '../../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class SignInRequest
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class SignInRequest extends ConfirmTransaction implements IConfirmation {
  /**
   * Creates an instance of SignInRequest.
   * @memberof SignInRequest
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/signature-request/), 'MetaMask');
  }
}
