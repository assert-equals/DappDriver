import { IConfirmation } from '@assert-equals/dappdriver';
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
