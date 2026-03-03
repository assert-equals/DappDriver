import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { Completion, SecureYourWallet } from '../../index';

/**
 *
 *
 * @export
 * @class CreatePassword
 * @extends {PageObject}
 */
export class CreatePassword extends PageObject {
  private get newPasswordInput(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-new"]');
  }
  private get confirmPasswordInput(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-confirm"]');
  }
  private get passwordTermsCheckbox(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-terms"]');
  }
  private get importButton(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-import"]');
  }
  private get createButton(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-wallet"]');
  }
  /**
   * Creates an instance of CreatePassword.
   * @memberof CreatePassword
   */
  constructor() {
    super('/home.html#onboarding/create-password', 'MetaMask');
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  async confirmPassword(password: string = 'P@ssword01!'): Promise<void> {
    return await this.confirmPasswordInput.type(password);
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  async enterPassword(password: string = 'P@ssword01!'): Promise<void> {
    return await this.newPasswordInput.type(password);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  async agreePasswordTerms(): Promise<void> {
    return await this.passwordTermsCheckbox.click();
  }
  /**
   *
   *
   * @return {*}  {Promise<Completion>}
   * @memberof CreatePassword
   */
  async importWallet(): Promise<Completion> {
    return await this.importButton.click<Completion>(Completion);
  }
  /**
   *
   *
   * @return {*}  {Promise<SecureYourWallet>}
   * @memberof CreatePassword
   */
  async createWallet(): Promise<SecureYourWallet> {
    return await this.createButton.click<SecureYourWallet>(SecureYourWallet);
  }
}
