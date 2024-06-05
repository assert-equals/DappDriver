import { IConfirmation } from '../../interface/wallet/confirmation';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class Connect
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class Connect extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super();
  }
}
