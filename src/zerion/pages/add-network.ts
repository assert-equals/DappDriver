import { HTMLElement } from '../../controls/html-element';
import { IAddNetwork } from '../../interface/wallet/add-network';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {PageObject}
 * @implements {IAddNetwork}
 */
export class AddNetwork extends PageObject implements IAddNetwork {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    await this.addButton().click();
    return this.closeButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
