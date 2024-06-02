import { HTMLElement } from '../../../../controls/html-element';
import { IConnect } from '../../../../interface/wallet/connect';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 * @implements {IConnect}
 */
export class Connect extends PageObject implements IConnect {
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');
  /**
   * Creates an instance of Connect.
   * @memberof Connect
   */
  constructor() {
    super('/notification.html#connect', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  async accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.nextButton().click();
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
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
