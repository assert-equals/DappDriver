import { IConfirmation } from '../../interface/wallet/confirmation';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class SignInRequest
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class SignInRequest extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of SignInRequest.
   * @memberof SignInRequest
   */
  constructor() {
    super();
  }
}
