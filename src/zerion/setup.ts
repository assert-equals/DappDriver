import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';
import { Welcome } from './pages/onboarding/welcome';

export async function setupZerionWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const handles: Array<string> = await page.waitForWindows(2);
  await page.switchToWindow(handles[1]);
  const welcomePage = new Welcome();
  const importWalletPage = await welcomePage.importExistingWallet();
  const recoveryPhrasePage = await importWalletPage.importRecoveryPhrase();
  await recoveryPhrasePage.enterSRP(seed);
  const selectWalletPage = await recoveryPhrasePage.confirmSecretRecoveryPhrase();
  await selectWalletPage.selectWallet(0);
  const passwordPage = await selectWalletPage.continue();
  await passwordPage.password();
  const confirmPasswordPage = await passwordPage.confirmPassword();
  await confirmPasswordPage.confirmPassword();
  const successPage = await confirmPasswordPage.setPassword();
  const extensionString: string = await successPage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await successPage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
