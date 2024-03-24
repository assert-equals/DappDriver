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
  private submitButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-submit-button"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-cancel-button"]');
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
   * @return {*}  {Promise<void>}
   * @memberof Confirmation
   */
  submit(): Promise<void> {
    return this.submitButton().click();
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}
   * @memberof Confirmation
   */
  submitAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.submitButton().clickAndSwitchToMainWindow<TPage>(page);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Confirmation
   */
  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
}
