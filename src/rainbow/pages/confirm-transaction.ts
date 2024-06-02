import { IConfirmTransaction } from '../../interface/wallet/confirm-transaction';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @extends {ApproveRequest}
 * @implements {IConfirmTransaction}
 */
export class ConfirmTransaction extends ApproveRequest implements IConfirmTransaction {
  /**
   * Creates an instance of ConfirmTransaction.
   * @memberof ConfirmTransaction
   */
  constructor() {
    super();
  }
}
