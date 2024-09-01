import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Completion, CreatePassword, Home, ImportWithRecoveryPhrase, Metametrics, Welcome } from '.';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';

let createPasswordPage: CreatePassword;
let completionPage: Completion;
let metametricsPage: Metametrics;

export async function setupMetaMaskWallet(seed: string): Promise<void> {
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
  const extensionString: string = await homePage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await homePage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}

export async function enableMetaMaskAutomation(metaMaskPath: string): Promise<void> {
  const runtimeLavaMoatPath = path.resolve(metaMaskPath, 'scripts', 'runtime-lavamoat.js');
  const file = readFileSync(runtimeLavaMoatPath, 'utf8');
  const updatedRuntimeLavaMoatData = file.replace(
    `"scuttleGlobalThis":{"enabled":true`,
    `"scuttleGlobalThis":{"enabled":false`
  );
  writeFileSync(runtimeLavaMoatPath, updatedRuntimeLavaMoatData);
}
