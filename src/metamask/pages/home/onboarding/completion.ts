import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { PinExtension } from './pin-extension';

export class Completion extends PageObject {
  private completeButton: () => HTMLElement = () => new HTMLElement('[data-testid="onboarding-complete-done"]');

  constructor() {
    super('/home.html#onboarding/completion', 'MetaMask');
  }

  completeOnboarding(): Promise<PinExtension> {
    return this.completeButton().clickAndRedirectsTo<PinExtension>(PinExtension);
  }
}
