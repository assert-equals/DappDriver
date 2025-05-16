import { Completion, CreatePassword, Home, ImportWithRecoveryPhrase, Metametrics, Welcome } from '.';
import { PageObject } from '../page';

let createPasswordPage: CreatePassword;
let completionPage: Completion;
let metametricsPage: Metametrics;

export async function setup(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const welcomePage: Welcome = await page.opensInWindow<Welcome>(Welcome);
  await welcomePage.agreeTermsOfUse();
  if (seed) {
    metametricsPage = await welcomePage.importAnExistingWallet();
    const importWithRecoveryPhrasePage =
      await metametricsPage.noThanks<ImportWithRecoveryPhrase>(ImportWithRecoveryPhrase);
    await importWithRecoveryPhrasePage.enterSRP(seed);
    createPasswordPage = await importWithRecoveryPhrasePage.confirmSecretRecoveryPhrase();
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    await createPasswordPage.agreePasswordTerms();
    completionPage = await createPasswordPage.importWallet();
  } else {
    metametricsPage = await welcomePage.createANewWallet();
    createPasswordPage = await metametricsPage.noThanks<CreatePassword>(CreatePassword);
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    await createPasswordPage.agreePasswordTerms();
    const secureYourWalletPage = await createPasswordPage.createWallet();
    const reviewRecoveryPage = await secureYourWalletPage.secureMyWallet();
    await reviewRecoveryPage.revealSecretRecoveryPhrase();
    const recoveryPhrase: Array<string> = await reviewRecoveryPage.getSRP();
    const confirmRecoveryPhrase = await reviewRecoveryPage.next();
    await confirmRecoveryPhrase.enterRequiredWords(recoveryPhrase);
    completionPage = await confirmRecoveryPhrase.confirm();
  }
  const pinExtensionPage = await completionPage.completeOnboarding();
  await pinExtensionPage.next();
  const homePage: Home = await pinExtensionPage.done();
  await homePage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
