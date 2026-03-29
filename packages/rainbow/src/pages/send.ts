import { IConfirmation } from '@assert-equals/dappdriver';
import { ApproveRequest } from './approve-request';

/**
 *
 *
 * @export
 * @class Send
 * @extends {ApproveRequest}
 * @implements {IConfirmation}
 */
export class Send extends ApproveRequest implements IConfirmation {
  /**
   * Creates an instance of Send.
   * @memberof Send
   */
  constructor() {
    super();
  }
}
