import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { Metametrics } from './metametrics';

export class Welcome extends PageObject {
  private termsOfUseCheckBox: () => HTMLElement = () => new HTMLElement('[data-testid="onboarding-terms-checkbox"]');
  private createANewWalletButton: () => HTMLElement = () => new HTMLElement('[data-testid="onboarding-create-wallet"]');
  private importAnExistingWalletButton: () => HTMLElement = () =>
    new HTMLElement('[data-testid="onboarding-import-wallet"]');

  constructor() {
    super('/home.html#onboarding/welcome', 'MetaMask');
  }

  agreeTermsOfUse(): Promise<void> {
    return this.termsOfUseCheckBox().click();
  }

  createANewWallet(): Promise<void> {
    return this.createANewWalletButton().click();
  }

  importAnExistingWallet(): Promise<Metametrics> {
    return this.importAnExistingWalletButton().clickAndRedirectsTo<Metametrics>(Metametrics);
  }
}
