import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { DappDriver } from '../session/dapp-driver';
import { PageObject } from '../page';
import { Completion, CreatePassword, Home, ImportWithRecoveryPhrase, Welcome } from '.';
import { WEBDRIVER } from '../constants';

let createPasswordPage: CreatePassword;
let completionPage: Completion;

export async function setupMetaMaskWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  // Account for the the offscreen document in MetaMask (MV3): 'MetaMask Offscreen Page'
  const expectedHandles: number = DappDriver.Instance.Framework === WEBDRIVER ? 3 : 2;
  const extension: number = expectedHandles - 1;
  const handles: Array<any> = await page.waitForWindows(expectedHandles);
  const welcomePage: Welcome = await page.switchToWindow<Welcome>(handles[extension], Welcome);
  await welcomePage.agreeTermsOfUse();
  if (seed) {
    const metametricsPage = await welcomePage.importAnExistingWallet();
    const importWithRecoveryPhrasePage =
      await metametricsPage.noThanks<ImportWithRecoveryPhrase>(ImportWithRecoveryPhrase);
    await importWithRecoveryPhrasePage.enterSRP(seed);
    createPasswordPage = await importWithRecoveryPhrasePage.confirmSecretRecoveryPhrase();
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

export async function enableMetaMaskAutomation(metaMaskPath: string): Promise<void> {
  const runtimeLavaMoatPath = path.resolve(metaMaskPath, 'scripts', 'runtime-lavamoat.js');
  const file = readFileSync(runtimeLavaMoatPath, 'utf8');
  const updatedRuntimeLavaMoatData = file.replace(
    `"scuttleGlobalThis":{"enabled":true`,
    `"scuttleGlobalThis":{"enabled":false`,
  );
  writeFileSync(runtimeLavaMoatPath, updatedRuntimeLavaMoatData);
}
