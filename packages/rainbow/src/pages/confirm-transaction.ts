import { IConfirmation } from '@assert-equals/dappdriver';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class ConfirmTransaction extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of ConfirmTransaction.
   * @memberof ConfirmTransaction
   */
  constructor() {
    super();
  }
}
