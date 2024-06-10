import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { ReviewRecoveryPhrase } from './review-recovery-phrase';
/**
 *
 *
 * @export
 * @class SecureYourWallet
 * @extends {PageObject}
 */
export class SecureYourWallet extends PageObject {
  private secureButton: () => HTMLElement = () => new HTMLElement('[data-testid="secure-wallet-recommended"]');
  /**
   * Creates an instance of SecureYourWallet.
   * @memberof SecureYourWallet
   */
  constructor() {
    super('/home.html#onboarding/secure-your-wallet', 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<ReviewRecoveryPhrase>}
   * @memberof SecureYourWallet
   */
  secureMyWallet(): Promise<ReviewRecoveryPhrase> {
    return this.secureButton().click<ReviewRecoveryPhrase>(ReviewRecoveryPhrase);
  }
}
