import { HTMLElement } from '../../controls';
import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class ApproveRequest
 * @extends {PageObject}
 */
export class ApproveRequest extends PageObject {
  private get acceptButton(): HTMLElement {
    return new HTMLElement('[data-testid="accept-request-button"]');
  }
  private get rejectButton(): HTMLElement {
    return new HTMLElement('[data-testid="reject-request-button"]');
  }
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
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.acceptButton.clickAndSwitchToWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ApproveRequest
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.rejectButton.clickAndSwitchToWindow<TPage>(page);
  }
}
