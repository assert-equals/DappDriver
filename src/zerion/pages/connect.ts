import { HTMLElement } from '../../controls/html-element';
import { IConnect } from '../../interface/wallet/connect';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 * @implements {IConnect}
 */
export class Connect extends PageObject implements IConnect {
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
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.connectButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  reject<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
