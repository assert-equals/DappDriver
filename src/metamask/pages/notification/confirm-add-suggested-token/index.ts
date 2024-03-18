import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';

export class ConfirmAddSuggestedToken extends PageObject {
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-next"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="page-container-footer-cancel"]');

  constructor() {
    super('#confirm-add-suggested-token', 'MetaMask');
  }

  nextAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.nextButton().clickAndSwitchToMainWindow<TPage>(page);
  }

  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
}
