import { DappDriver } from '../session/dapp-driver';
import { Home } from '../metamask/pages/home';
import { PageObject } from '../page';
import { ExperimentalArea } from './pages/home/onboarding/experimental-area';

export async function setupMetaMaskFlaskWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const handles: Array<string> = await page.waitForWindows(2);
  await page.switchToWindow(handles[1]);
  const experimentalArea = new ExperimentalArea();
  const welcomePage = await experimentalArea.iAccept();
  await welcomePage.agreeTermsOfUse();
  const metametricsPage = await welcomePage.importAnExistingWallet();
  const importWithRecoveryPhrasePage = await metametricsPage.noThanks();
  await importWithRecoveryPhrasePage.enterSRP(seed);
  const createPasswordPage = await importWithRecoveryPhrasePage.confirmSecretRecoveryPhrase();
  await createPasswordPage.enterPassword();
  await createPasswordPage.confirmPassword();
  await createPasswordPage.agreePasswordTerms();
  const completionPage = await createPasswordPage.importWallet();
  const pinExtensionPage = await completionPage.completeOnboarding();
  await pinExtensionPage.next();
  const homePage: Home = await pinExtensionPage.done();
  const extensionString: string = await homePage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await homePage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
