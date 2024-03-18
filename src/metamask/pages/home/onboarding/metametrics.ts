import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { ImportWithRecoveryPhrase } from './import-with-recory-phrase';

export class Metametrics extends PageObject {
  private iAgreeButton: () => HTMLElement = () => new HTMLElement('[data-testid="metametrics-i-agree"]');
  private noThanksButton: () => HTMLElement = () => new HTMLElement('[data-testid="metametrics-no-thanks"]');

  constructor() {
    super('/home.html#onboarding/metametrics', 'MetaMask');
  }

  iAgree(): Promise<void> {
    return this.iAgreeButton().click();
  }

  noThanks(): Promise<ImportWithRecoveryPhrase> {
    return this.noThanksButton().clickAndRedirectsTo<ImportWithRecoveryPhrase>(ImportWithRecoveryPhrase);
  }
}
