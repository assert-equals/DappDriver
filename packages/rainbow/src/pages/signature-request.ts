import { IConfirmation } from '@assert-equals/dappdriver';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class SignatureRequest extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of SignatureRequest.
   * @memberof SignatureRequest
   */
  constructor() {
    super();
  }
}
