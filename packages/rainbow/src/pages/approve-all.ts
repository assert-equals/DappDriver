import { IConfirmation } from '@assert-equals/dappdriver';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class ApproveAll
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class ApproveAll extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of ApproveAll.
   * @memberof ApproveAll
   */
  constructor() {
    super();
  }
}
