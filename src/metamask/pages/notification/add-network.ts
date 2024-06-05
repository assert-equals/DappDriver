import { HTMLElement } from '../../../controls/html-element';
import { IConfirmation } from '../../../interface/wallet/confirmation';
import { PageObject } from '../../../page';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class AddNetwork extends PageObject implements IConfirmation {
  private submitButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-submit-button"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-cancel-button"]');
  /**
   * Creates an instance of AddNetwork.
   * @memberof AddNetwork
   */
  constructor() {
    super('/notification.html#connect', 'MetaMask');
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
    await this.submitButton().clickAndWait();
    if (page) {
      return this.submitButton().clickAndSwitchToMainWindow<TPage>(page);
    } else {
      return this.submitButton().click();
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
