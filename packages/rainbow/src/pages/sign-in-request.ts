import { IConfirmation } from '@assert-equals/dappdriver';
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
