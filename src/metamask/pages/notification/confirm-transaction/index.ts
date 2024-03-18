import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';

export class ConfirmTransaction extends PageObject {
  protected nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  protected cencelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');

  constructor(url: string | RegExp = '#confirm-transaction', title: string = 'MetaMask') {
    super(url, title);
  }

  nextAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }

  next(): Promise<void> {
    return this.nextButton().click();
  }

  cancel(): Promise<void> {
    return this.cencelButton().click();
  }
}
