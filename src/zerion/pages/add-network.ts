import { HTMLElement } from '../../controls/html-element';
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
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof AddNetwork
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    await this.addButton.click();
    if (page) {
      return await this.closeButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.closeButton.click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof AddNetwork
   */
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.cancelButton.clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return await this.cancelButton.click();
    }
  }
}
