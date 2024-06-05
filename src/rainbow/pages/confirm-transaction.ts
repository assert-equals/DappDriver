import { IConfirmation } from '../../interface/wallet/confirmation';
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
