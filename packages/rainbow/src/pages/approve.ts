import { IConfirmation } from '@assert-equals/dappdriver';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class Approve
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class Approve extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of Approve.
   * @memberof Approve
   */
  constructor() {
    super();
  }
}
