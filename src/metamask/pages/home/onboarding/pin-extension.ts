import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { Home } from '..';

export class PinExtension extends PageObject {
  private nextButton: () => HTMLElement = () => new HTMLElement('[data-testid="pin-extension-next"]');
  private doneButton: () => HTMLElement = () => new HTMLElement('[data-testid="pin-extension-done"]');

  constructor() {
    super('/home.html#onboarding/pin-extension', 'MetaMask');
  }

  next(): Promise<void> {
    return this.nextButton().click();
  }

  done(): Promise<Home> {
    return this.doneButton().clickAndRedirectsTo<Home>(Home);
  }
}
