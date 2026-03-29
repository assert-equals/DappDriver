import { HTMLElement, IConfirmation, IPageObject, PageObject } from '@assert-equals/dappdriver';

/**
 *
 *
 * @export
 * @class Approve
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Approve extends PageObject implements IConfirmation {
  private get confirmButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Confirm")]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Cancel")]');
  }
  /**
   * Creates an instance of Approve.
   * @memberof Approve
   */
  constructor() {
    super('#/sendTransaction', 'Zerion · Send Transaction');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Approve
   */
  async accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.confirmButton.clickAndSwitchToWindow<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Approve
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
