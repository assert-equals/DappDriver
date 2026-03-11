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
  private get addButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Add")]');
  }
  private get closeButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Close")]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Cancel")]');
  }
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super('#/addEthereumChain', 'Zerion · Add network');
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
    await this.addButton.click();
    return await this.closeButton.clickAndSwitchToWindow<TPage>(page);
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
