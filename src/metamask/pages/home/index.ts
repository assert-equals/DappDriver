import { HTMLElement } from '../../../controls/html-element';
import { HTMLElementCollection } from '../../../controls/html-element-collection';
import { PageObject } from '../../../page';
import { DappDriver } from '../../../session/dapp-driver';

export class Home extends PageObject {
  public static expandViewUrl: () => string = () => DappDriver.Instance.Extension + '/home.html';
  private whatsNewCloseButton: () => HTMLElement = () => new HTMLElement('[data-testid="popover-close"]', 1000);
  private whatsNewScrollButton: () => HTMLElement = () => new HTMLElement('[aria-label="Scroll down"]', 1000);
  private balanceLabel: () => HTMLElement = () => new HTMLElement('[data-testid="eth-overview__primary-currency"]');
  private activityTab: () => HTMLElement = () => new HTMLElement('[data-testid="home__activity-tab"]');
  private activityListItemsAction: () => HTMLElementCollection = () =>
    new HTMLElementCollection('.transaction-list__completed-transactions [data-testid="activity-list-item-action"]');
  private activityListItemsPrimaryCurrency: () => HTMLElementCollection = () =>
    new HTMLElementCollection(
      '.transaction-list__completed-transactions [data-testid="transaction-list-item-primary-currency"]',
    );
  private activityListItemsSecondaryCurrency: () => HTMLElementCollection = () =>
    new HTMLElementCollection(
      '.transaction-list__completed-transactions [data-testid="transaction-list-item-secondary-currency"]',
    );
  private lastActivityListItem: () => HTMLElement = () => new HTMLElement('.whats-new-popup__last-notification');

  constructor() {
    super('/home.html', 'MetaMask');
  }

  clickActivityTab(): Promise<void> {
    return this.activityTab().click();
  }

  waitForActivity(items: number): Promise<void> {
    return this.waitForFunction(
      async () => {
        const completedActivityItems = await this.activityListItemsAction().elements();
        return completedActivityItems.length === items;
      },
      `Waiting for ${items} element(s) to be located`,
      20_000,
    );
  }

  waitForWhatsNew(): Promise<void> {
    return this.waitForFunction(async () => {
      const whatsNewShown = await this.whatsNewCloseButton().isDisplayed();
      return whatsNewShown === true;
    }, `Waiting for whats new to be displayed`);
  }

  closePopover(): Promise<void> {
    return this.whatsNewCloseButton().click();
  }

  async closeWhatsNewPopover(): Promise<void> {
    await this.waitForWhatsNew();
    const scrollIsDisplayed = await this.whatsNewScrollButton().isDisplayed();
    if (scrollIsDisplayed) {
      await this.whatsNewScrollButton().clickAndWait();
      await this.lastActivityListItem().hover();
    }
    await this.closePopover();
  }

  async getMostRecentActivityItemAction(): Promise<string> {
    return await (await this.activityListItemsAction().elements())[0].getText();
  }

  async getMostRecentActivityItemPrimaryCurrency(): Promise<string> {
    return await (await this.activityListItemsPrimaryCurrency().elements())[0].getText();
  }

  async getMostRecentActivityItemSecondaryCurrency(): Promise<string> {
    return await (await this.activityListItemsSecondaryCurrency().elements())[0].getText();
  }

  getBalance(): Promise<string> {
    return this.balanceLabel().getText();
  }
}
