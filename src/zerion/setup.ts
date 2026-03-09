import { BackUp, ConfirmPassword, Create, Password, Success, Welcome } from '.';
import { PageObject } from '../page';

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
    passwordPage = await selectWalletPage.continue();
    await passwordPage.password();
    confirmPasswordPage = await passwordPage.confirmPassword();
    await confirmPasswordPage.confirmPassword();
    await confirmPasswordPage.setPassword<Success>(Success);
  } else {
    passwordPage = await welcomePage.createNewWallet();
    await passwordPage.password();
    confirmPasswordPage = await passwordPage.confirmPassword();
    await confirmPasswordPage.confirmPassword();
    const createPage: Create = await confirmPasswordPage.setPassword<Create>(Create);
    const backupPage: BackUp = await createPage.create();
    await backupPage.continue();
    await backupPage.continue();
    const backupRecoveryPhrasePage = await backupPage.backUpNow();
    await backupRecoveryPhrasePage.reveal();
    const seedPhrase: Array<string> = await backupRecoveryPhrasePage.getSeed();
    const verifyPage = await backupRecoveryPhrasePage.verify();
    await verifyPage.enterSeed(seedPhrase);
    await verifyPage.verify();
  }
}
