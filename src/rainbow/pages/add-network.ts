import { IAddNetwork } from '../../interface/wallet/add-network';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {ApproveRequest}
 * @implements {IAddNetwork}
 */
export class AddNetwork extends ApproveRequest implements IAddNetwork {
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super();
  }
}
