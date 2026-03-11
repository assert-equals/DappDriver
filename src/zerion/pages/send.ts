import { HTMLElement } from '../../controls/html-element';
import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { PageObject } from '../../page';

/**
 *
 *
 * @export
 * @class Send
 * @extends {PageObject}
 * @implements {IConfirmation}
 */
export class Send extends PageObject implements IConfirmation {
  private get confirmButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Confirm")]');
  }
  private get cancelButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Cancel")]');
  }
  /**
   * Creates an instance of Send.
   * @memberof Send
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
   * @memberof Send
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
   * @memberof Send
   */
  async reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.cancelButton.clickAndSwitchToWindow<TPage>(page);
  }
}
