import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

export class Confirmation extends PageObject {
  private submitButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-submit-button"]');
  private cancelButton: () => HTMLElement = () => new HTMLElement('[data-testid="confirmation-cancel-button"]');

  constructor() {
    super('/notification.html', 'MetaMask');
  }

  submit(): Promise<void> {
    return this.submitButton().click();
  }

  submitAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.submitButton().clickAndSwitchToMainWindow<TPage>(page);
  }

  cancel(): Promise<void> {
    return this.cancelButton().click();
  }
}
