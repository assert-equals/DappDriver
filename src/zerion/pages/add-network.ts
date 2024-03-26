import { HTMLElement } from '../../controls/html-element';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {PageObject}
 */
export class AddNetwork extends PageObject {
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
   * @return {*}  {Promise<void>}
   * @memberof AddNetwork
   */
  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof AddNetwork
   */
  add(): Promise<void> {
    return this.addButton().click();
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  closeAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.closeButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
