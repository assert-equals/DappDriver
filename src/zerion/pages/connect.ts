import { HTMLElement } from '../../controls/html-element';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 */
export class Connect extends PageObject {
  private connectButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Connect")]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('xpath=//button[contains(., "Cancel")]');
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super('html?templateType=dialog#/requestAccounts', 'Zerion · Connect Wallet');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Connect
   */
  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Connect
   */
  connect(): Promise<void> {
    return this.connectButton().click();
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  connectAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.connectButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
