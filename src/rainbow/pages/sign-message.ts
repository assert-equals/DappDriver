import { ISignMessage } from '../../interface/wallet/sign-message';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {ApproveRequest}
 * @implements {ISignMessage}
 */
export class SignMessage extends ApproveRequest implements ISignMessage {
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super();
  }
}
