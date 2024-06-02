import { IAddNetwork } from '../../../interface/wallet/add-network';
import { PageObject } from '../../../page';
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
  async accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.submitButton().click();
    return this.submitButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
