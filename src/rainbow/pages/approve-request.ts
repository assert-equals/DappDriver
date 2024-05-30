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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ApproveRequest
   */
  accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.acceptButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ApproveRequest
   */
  reject<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.rejectButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
