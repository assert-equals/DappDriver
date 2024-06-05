import { PageObject } from '../../page';
import { HTMLElement } from '../../controls';
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
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof ApproveRequest
   */
  accept<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.acceptButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.acceptButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof ApproveRequest
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.rejectButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.rejectButton().click();
    }
  }
}
