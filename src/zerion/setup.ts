import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';
import { Information } from './pages/onboarding/information';
import { Password } from './pages/onboarding/password';
import { Success } from './pages/onboarding/success';
import { Welcome } from './pages/onboarding/welcome';

let successPage: Success;
let passwordPage: Password;
let informationPage: Information;
export async function setupZerionWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const handles: Array<any> = await page.waitForWindows(2);
  const welcomePage: Welcome = await page.switchToWindow<Welcome>(handles[1], Welcome);
  if (seed) {
    const importWalletPage = await welcomePage.importExistingWallet();
    const recoveryPhrasePage = await importWalletPage.importRecoveryPhrase();
    await recoveryPhrasePage.enterSRP(seed);
    const selectWalletPage = await recoveryPhrasePage.confirmSecretRecoveryPhrase();
    await selectWalletPage.selectWallet(0);
    passwordPage = await selectWalletPage.continue();
    await passwordPage.password();
    const confirmPasswordPage = await passwordPage.confirmPassword();
    await confirmPasswordPage.confirmPassword();
    successPage = await confirmPasswordPage.setPassword<Success>(Success);
  } else {
    passwordPage = await welcomePage.createNewWallet();
    await passwordPage.password();
    const confirmPasswordPage = await passwordPage.confirmPassword();
    await confirmPasswordPage.confirmPassword();
    informationPage = await confirmPasswordPage.setPassword<Information>(Information);
    await informationPage.stepOne();
    await informationPage.stepTwo();
    const backupPage = await informationPage.backUpNow();
    await backupPage.reveal();
    const seedPhrase = await backupPage.getSeed();
    const verifyPage = await backupPage.verifyBackup();
    const words = seedPhrase.split(' ');
    for (const word of words) {
      await verifyPage.enterWord(words.indexOf(word), word);
    }
    successPage = await verifyPage.verify();
  }
  const extensionString: string = await successPage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await successPage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
