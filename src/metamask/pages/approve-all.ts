import { HTMLElement } from '../../controls/html-element';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ConfirmTransaction } from './confirm-transaction';

/**
 *
 *
 * @export
 * @class ApproveAll
 * @extends {ConfirmTransaction}
 * @implements {IConfirmation}
 */
export class ApproveAll extends ConfirmTransaction implements IConfirmation {
  private approveButton: () => HTMLElement = () => new HTMLElement('#popover-content button:nth-child(1)');
  /**
   * Creates an instance of ApproveAll.
   * @memberof ApproveAll
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/set-approval-for-all/), 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveAll
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    await this.nextButton().click();
    if (page) {
      return await this.approveButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.approveButton().click();
    }
  }
}
