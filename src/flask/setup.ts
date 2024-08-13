import { ExperimentalArea } from '.';
import { Completion, CreatePassword, Home, ImportWithRecoveryPhrase } from '../metamask';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';

let createPasswordPage: CreatePassword;
let completionPage: Completion;

export async function setupMetaMaskFlaskWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const experimentalArea: ExperimentalArea = await page.opensInWindow<ExperimentalArea>(ExperimentalArea);
  const welcomePage = await experimentalArea.iAccept();
  await welcomePage.agreeTermsOfUse();
  if (seed) {
    const metametricsPage = await welcomePage.importAnExistingWallet();
    const importWithRecoveryPhrasePage =
      await metametricsPage.noThanks<ImportWithRecoveryPhrase>(ImportWithRecoveryPhrase);
    await importWithRecoveryPhrasePage.enterSRP(seed);
    const createPasswordPage = await importWithRecoveryPhrasePage.confirmSecretRecoveryPhrase();
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    await createPasswordPage.agreePasswordTerms();
    completionPage = await createPasswordPage.importWallet();
  } else {
    const metametricsPage = await welcomePage.createANewWallet();
    createPasswordPage = await metametricsPage.noThanks<CreatePassword>(CreatePassword);
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    await createPasswordPage.agreePasswordTerms();
    const secureYourWalletPage = await createPasswordPage.createWallet();
    const reviewRecoveryPage = await secureYourWalletPage.secureMyWallet();
    await reviewRecoveryPage.revealSecretRecoveryPhrase();
    const recoveryPhrase = await reviewRecoveryPage.getSRP();
    const words = recoveryPhrase.split(/\s*(?:[0-9)]+|\n|\.|^$|$)\s*/u);
    const finalWords = words.filter((str) => str !== '');
    const confirmRecoveryPhrase = await reviewRecoveryPage.next();
    await confirmRecoveryPhrase.enterWord(2, finalWords[2]);
    await confirmRecoveryPhrase.enterWord(3, finalWords[3]);
    await confirmRecoveryPhrase.enterWord(7, finalWords[7]);
    completionPage = await confirmRecoveryPhrase.confirm();
  }
  const pinExtensionPage = await completionPage.completeOnboarding();
  await pinExtensionPage.next();
  const homePage: Home = await pinExtensionPage.done();
  const extensionString: string = await homePage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await homePage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
