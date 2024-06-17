import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { Completion, SecureYourWallet } from '../../../index';

/**
 *
 *
 * @export
 * @class CreatePassword
 * @extends {PageObject}
 */
export class CreatePassword extends PageObject {
  private newPasswordInput: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-new"]');
  private confirmPasswordInput: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-confirm"]');
  private passwordTermsCheckbox: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-terms"]');
  private importButton: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-import"]');
  private createButton: () => HTMLElement = () => new HTMLElement('[data-testid="create-password-wallet"]');
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
  confirmPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.confirmPasswordInput().type(password);
  }
  /**
   *
   *
   * @param {string} [password='P@ssword01!']
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  enterPassword(password: string = 'P@ssword01!'): Promise<void> {
    return this.newPasswordInput().type(password);
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof CreatePassword
   */
  agreePasswordTerms(): Promise<void> {
    return this.passwordTermsCheckbox().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<Completion>}
   * @memberof CreatePassword
   */
  importWallet(): Promise<Completion> {
    return this.importButton().click<Completion>(Completion);
  }
  /**
   *
   *
   * @return {*}  {Promise<SecureYourWallet>}
   * @memberof CreatePassword
   */
  createWallet(): Promise<SecureYourWallet> {
    return this.createButton().click<SecureYourWallet>(SecureYourWallet);
  }
}
