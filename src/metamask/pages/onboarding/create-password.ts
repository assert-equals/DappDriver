import { Metametrics, ReviewRecoveryPhrase } from '../..';
import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class CreatePassword
 * @extends {PageObject}
 */
export class CreatePassword extends PageObject {
  private get newPasswordInput(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-new-input"]');
  }
  private get confirmPasswordInput(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-confirm-input"]');
  }
  private get passwordTermsCheckbox(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-terms"]');
  }
  private get submitButton(): HTMLElement {
    return new HTMLElement('[data-testid="create-password-submit"]');
  }
  /**
   * Creates an instance of CreatePassword.
   * @memberof CreatePassword
   */
  constructor() {
    super('/home.html#/onboarding/create-password', 'MetaMask');
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
   * @return {*}  {Promise<Metametrics>}
   * @memberof CreatePassword
   */
  async importWallet(): Promise<Metametrics> {
    return await this.submitButton.click<Metametrics>(Metametrics);
  }
  /**
   *
   *
   * @return {*}  {Promise<ReviewRecoveryPhrase>}
   * @memberof CreatePassword
   */
  async createWallet(): Promise<ReviewRecoveryPhrase> {
    return await this.submitButton.click<ReviewRecoveryPhrase>(ReviewRecoveryPhrase);
  }
}
