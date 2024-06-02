import { IConnect } from '../../interface/wallet/connect';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class Connect
 * @extends {ApproveRequest}
 * @implements {IConnect}
 */
export class Connect extends ApproveRequest implements IConnect {
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super();
  }
}
