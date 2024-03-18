import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { DappDriver } from '../session/dapp-driver';
import { Home } from './pages/home';
import { PageObject } from '../page';
import { Welcome } from './pages/home/onboarding/welcome';

export async function setupMetaMaskWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const handles: Array<string> = await page.waitForWindows(2);
  await page.switchToWindow(handles[1]);
  const welcomePage = new Welcome();
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
  await homePage.closeWhatsNewPopover();
  const extensionString: string = await homePage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await homePage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}

export async function enableMetaMaskAutomation(metaMaskPath: string): Promise<void> {
  const runtimeLavaMoatPath = path.resolve(metaMaskPath, 'runtime-lavamoat.js');
  const file = readFileSync(runtimeLavaMoatPath, 'utf8');
  const updatedRuntimeLavaMoatData = file.replace(
    `"scuttleGlobalThis":{"enabled":true`,
    `"scuttleGlobalThis":{"enabled":false`,
  );
  writeFileSync(runtimeLavaMoatPath, updatedRuntimeLavaMoatData);
}
