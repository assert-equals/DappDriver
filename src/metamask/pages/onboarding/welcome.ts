import { CreatePassword, ImportWithRecoveryPhrase } from '../../';
import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Welcome
 * @extends {PageObject}
 */
export class Welcome extends PageObject {
  private get createANewWalletButton(): HTMLElement {
    return new HTMLElement('[data-testid="onboarding-create-wallet"]');
  }
  private get importAnExistingWalletButton(): HTMLElement {
    return new HTMLElement('[data-testid="onboarding-import-wallet"]');
  }
  private get createWithSRPButton(): HTMLElement {
    return new HTMLElement('[data-testid="onboarding-create-with-srp-button"]');
  }
  private get importWithSRPButton(): HTMLElement {
    return new HTMLElement('[data-testid="onboarding-import-with-srp-button"]');
  }
  /**
   * Creates an instance of Welcome.
   * @memberof Welcome
   */
  constructor() {
    super('/home.html#/onboarding/welcome', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<CreatePassword>}
   * @memberof Welcome
   */
  async createANewWallet(): Promise<CreatePassword> {
    await this.createANewWalletButton.click();
    return await this.createWithSRPButton.click<CreatePassword>(CreatePassword);
  }
  /**
   *
   *
   * @return {*}  {Promise<ImportWithRecoveryPhrase>}
   * @memberof Welcome
   */
  async iHaveAnExistingWallet(): Promise<ImportWithRecoveryPhrase> {
    await this.importAnExistingWalletButton.click();
    return await this.importWithSRPButton.click<ImportWithRecoveryPhrase>(ImportWithRecoveryPhrase);
  }
}
