import { HTMLElement } from '../../../../controls/html-element';
import { IConfirmation } from '../../../../interface/wallet/confirmation';
import { PageObject } from '../../../../page';

/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Connect extends PageObject implements IConfirmation {
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
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Connect
   */
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    await this.nextButton().clickAndWait();
    if (page) {
      return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.nextButton().click();
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Connect
   */
  reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.cancelButton().click();
    }
  }
}
