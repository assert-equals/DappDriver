import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
/**
 *
 *
 * @export
 * @class Confirmation
 * @extends {PageObject}
 */
export class Confirmation extends PageObject {
  protected submitButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-submit-button"]');
  protected cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-cancel-button"]');
  /**
   * Creates an instance of Confirmation.
   * @memberof Confirmation
   */
  constructor() {
    super('/notification.html', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Confirmation
   */
  accept<TPage>(page: new () => TPage): Promise<TPage> {
    return this.submitButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Confirmation
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.cancelButton().clickAndSwitchToMainWindow<TPage>(page);
  }
}
