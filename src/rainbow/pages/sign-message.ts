import { IConfirmation } from '../../interface/wallet/confirmation';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class SignMessage
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class SignMessage extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of SignMessage.
   * @memberof SignMessage
   */
  constructor() {
    super();
  }
}
