import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { Metametrics } from './metametrics';
/**
 *
 *
 * @export
 * @class Welcome
 * @extends {PageObject}
 */
export class Welcome extends PageObject {
  private termsOfUseCheckBox: () => HTMLElement = () => new HTMLElement('[data-testid="onboarding-terms-checkbox"]');
  private createANewWalletButton: () => HTMLElement = () => new HTMLElement('[data-testid="onboarding-create-wallet"]');
  private importAnExistingWalletButton: () => HTMLElement = () =>
    new HTMLElement('[data-testid="onboarding-import-wallet"]');
  /**
   * Creates an instance of Welcome.
   * @memberof Welcome
   */
  constructor() {
    super('/home.html#onboarding/welcome', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Welcome
   */
  agreeTermsOfUse(): Promise<void> {
    return this.termsOfUseCheckBox().click();
  }
  /**
   *
   *
   * @return {*}  {Promise<Metametrics>}
   * @memberof Welcome
   */
  createANewWallet(): Promise<Metametrics> {
    return this.createANewWalletButton().click<Metametrics>(Metametrics);
  }
  /**
   *
   *
   * @return {*}  {Promise<Metametrics>}
   * @memberof Welcome
   */
  importAnExistingWallet(): Promise<Metametrics> {
    return this.importAnExistingWalletButton().click<Metametrics>(Metametrics);
  }
}
