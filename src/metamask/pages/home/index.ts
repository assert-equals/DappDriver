import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { DappDriver } from '../../../session/dapp-driver';
/**
 *
 *
 * @export
 * @class Home
 * @extends {PageObject}
 */
export class Home extends PageObject {
  public static expandViewUrl: () => string = () => DappDriver.Instance.Extension + '/home.html';
  private whatsNewCloseButton: () => HTMLElement = () => new HTMLElement('[data-testid="popover-close"]', 1000);
  private whatsNewScrollButton: () => HTMLElement = () => new HTMLElement('[aria-label="Scroll down"]', 1000);
  /**
   * Creates an instance of Home.
   * @memberof Home
   */
  constructor() {
    super('/home.html', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Home
   */
  waitForWhatsNew(): Promise<void> {
    return this.waitForFunction(async () => {
      const whatsNewShown = await this.whatsNewCloseButton().isDisplayed();
      return whatsNewShown === true;
    }, `Waiting for whats new to be displayed`);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Home
   */
  closePopover(): Promise<void> {
    return this.whatsNewCloseButton().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Home
   */
  async closeWhatsNewPopover(): Promise<void> {
    await this.waitForWhatsNew();
    const scrollIsDisplayed = await this.whatsNewScrollButton().isDisplayed();
    if (scrollIsDisplayed) {
      await this.whatsNewScrollButton().clickAndWait();
    }
    await this.closePopover();
  }
}
