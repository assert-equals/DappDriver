import { HTMLElement } from '../../controls';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class ApproveRequest
 * @extends {PageObject}
 */
export class ApproveRequest extends PageObject {
  private acceptButton: () => HTMLElement = () => new HTMLElement('[data-testid="accept-request-button"]');
  private rejectButton: () => HTMLElement = () => new HTMLElement('[data-testid="reject-request-button"]');
  /**
   * Creates an instance of ApproveRequest.
   * @memberof ApproveRequest
   */
  constructor() {
    super(new RegExp(/popup\.html\?tabId=\d+#\/approve-request/), 'Rainbow Wallet');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveRequest
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.acceptButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.acceptButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveRequest
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.rejectButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.rejectButton().click();
    }
  }
}
