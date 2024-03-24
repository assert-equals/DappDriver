import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { Completion } from './completion';

export class CreatePassword extends PageObject {
  private newPasswordInput: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-new"]');
  private confirmPasswordInput: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-confirm"]');
  private passwordTermsCheckbox: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-terms"]');
  private importButton: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-import"]');

  constructor() {
    super('/home.html#onboarding/create-password', 'MetaMask');
  }

  confirmPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.confirmPasswordInput().type(password);
  }

  enterPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.newPasswordInput().type(password);
  }

  agreePasswordTerms(): Promise<void> {
    return this.passwordTermsCheckbox().click();
  }

  async importWallet(): Promise<Completion> {
    return await this.importButton().clickAndRedirectsTo<Completion>(Completion);
  }
}
