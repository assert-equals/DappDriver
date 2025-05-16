import { ConfirmPassword, Information, Password, Success, Welcome } from '.';
import { PageObject } from '../page';

let successPage: Success;
let passwordPage: Password;
let confirmPasswordPage: ConfirmPassword;

export async function setup(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const welcomePage: Welcome = await page.opensInWindow<Welcome>(Welcome);
  if (seed) {
    const importWalletPage = await welcomePage.importExistingWallet();
    const recoveryPhrasePage = await importWalletPage.importRecoveryPhrase();
    await recoveryPhrasePage.enterSRP(seed);
    const selectWalletPage = await recoveryPhrasePage.confirmSecretRecoveryPhrase();
    await selectWalletPage.selectWallet(0);
    passwordPage = await selectWalletPage.continue();
    await passwordPage.password();
    confirmPasswordPage = await passwordPage.confirmPassword();
    await confirmPasswordPage.confirmPassword();
    successPage = await confirmPasswordPage.setPassword<Success>(Success);
  } else {
    passwordPage = await welcomePage.createNewWallet();
    await passwordPage.password();
    confirmPasswordPage = await passwordPage.confirmPassword();
    await confirmPasswordPage.confirmPassword();
    const informationPage = await confirmPasswordPage.setPassword<Information>(Information);
    await informationPage.stepOne();
    await informationPage.stepTwo();
    const backupPage = await informationPage.backUpNow();
    await backupPage.reveal();
    const seedPhrase: Array<string> = await backupPage.getSeed();
    const verifyPage = await backupPage.verifyBackup();
    await verifyPage.enterSeed(seedPhrase);
    successPage = await verifyPage.verify();
  }
  await successPage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
