import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class Approve
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class Approve extends ConfirmTransaction implements IConfirmation {
  /**
   * Creates an instance of Approve.
   * @memberof Approve
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/approve/), 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Approve
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    await this.nextButton().clickAndWait();
    if (page) {
      return await this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.nextButton().click();
    }
  }
}
