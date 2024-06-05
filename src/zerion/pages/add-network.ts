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
  private addButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Add")]');
  private closeButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Close")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super('html?templateType=dialog#/addEthereumChain', 'Zerion · Add network');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof AddNetwork
   */
  async accept<TPage>(page?: new () => TPage): Promise<void | TPage> {
    await this.addButton().click();
    if (page) {
      return this.closeButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.closeButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof AddNetwork
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
