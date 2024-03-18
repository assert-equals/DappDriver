import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';

export class Connect extends PageObject {
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');

  constructor() {
    super('/notification.html#connect', 'MetaMask');
  }

  nextAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }

  cancel(): Promise<void> {
    return this.cancelButton().click();
  }

  next(): Promise<void> {
    return this.nextButton().click();
  }
}
