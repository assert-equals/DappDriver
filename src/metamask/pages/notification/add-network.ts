import { IAddNetwork } from '../../../interface/wallet/add-network';
import { Confirmation } from './confirmation';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {Confirmation}
 * @implements {IAddNetwork}
 */
export class AddNetwork extends Confirmation implements IAddNetwork {
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super();
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    await this.submitButton().click();
    return this.submitButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
