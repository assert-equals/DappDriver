import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class Connect
 * @extends {PageObject}
 */
export class Connect extends PageObject {
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
  nextAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
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
  next(): Promise<void> {
    return this.nextButton().click();
  }
}
