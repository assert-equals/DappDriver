import { HTMLElement } from '../../controls/html-element';
import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class AddNetwork extends PageObject implements IConfirmation {
  private get submitButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirmation-submit-button"]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('[data-testid="confirmation-cancel-button"]');
  }
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super('/notification.html#/confirmation', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.submitButton.clickAndSwitchToWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
