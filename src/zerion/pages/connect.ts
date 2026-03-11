import { HTMLElement } from '../../controls/html-element';
import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Connect extends PageObject implements IConfirmation {
  private get connectButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Connect")]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Cancel")]');
  }
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super('#/requestAccounts', 'Zerion · Connect Wallet');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.connectButton.clickAndSwitchToWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
