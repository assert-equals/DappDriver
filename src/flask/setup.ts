import { ExperimentalArea } from '.';
import {
  Completion,
  ConfirmRecoveryPhrase,
  CreatePassword,
  ImportWithRecoveryPhrase,
  Metametrics,
  ReviewRecoveryPhrase,
  SidePanel
} from '../metamask';
import { PageObject } from '../page';

let createPasswordPage: CreatePassword;
let metametricsPage: Metametrics;

export async function setup(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const experimentalArea: ExperimentalArea = await page.waitAndSwitchToWindow<ExperimentalArea>(ExperimentalArea);
  const welcomePage = await experimentalArea.iAccept();
  if (seed) {
    const importWithRecoveryPhrasePage: ImportWithRecoveryPhrase = await welcomePage.iHaveAnExistingWallet();
    await importWithRecoveryPhrasePage.enterSRP(seed);
    createPasswordPage = await importWithRecoveryPhrasePage.confirmSecretRecoveryPhrase();
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    await createPasswordPage.agreePasswordTerms();
    metametricsPage = await createPasswordPage.importWallet();
  } else {
    createPasswordPage = await welcomePage.createANewWallet();
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    await createPasswordPage.agreePasswordTerms();
    const reviewPage: ReviewRecoveryPhrase = await createPasswordPage.createWallet();
    await reviewPage.revealSecretRecoveryPhrase();
    const confirmPage: ConfirmRecoveryPhrase = await reviewPage.next();
    await confirmPage.confirmRequiredWords();
    metametricsPage = await confirmPage.confirm();
  }
  const completionPage: Completion = await metametricsPage.continue();
  const sidePanel: SidePanel = await completionPage.completeOnboarding();
  await sidePanel.closeAndSwitchToWindow<Completion>(Completion);
}
