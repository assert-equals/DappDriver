import { IConfirmation } from '@assert-equals/dappdriver';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class AddNetwork extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super();
  }
}
