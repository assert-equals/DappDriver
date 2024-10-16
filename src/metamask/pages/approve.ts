import { HTMLElement } from '../../controls/html-element';
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
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  protected cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');
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
