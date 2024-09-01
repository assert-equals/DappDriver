import { CreatePassword, Ready, Welcome } from '.';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';

let createPasswordPage: CreatePassword;
let readyPage: Ready;

export async function setupRainbowWallet(seed: string): Promise<void> {
  const page: PageObject = new PageObject();
  const welcomePage: Welcome = await page.opensInWindow<Welcome>(Welcome);
  if (seed) {
    const importOrConnectPage = await welcomePage.importOrConnectAWallet();
    const importPage = await importOrConnectPage.importWithASecretRecoveryPhraseOrPrivateKey();
    const importSeedPage = await importPage.importFromASecretRecoveryPhrase();
    await importSeedPage.enterSRP(seed);
    const importSelectPage = await importSeedPage.importWalletGroup();
    createPasswordPage = await importSelectPage.importWalletGroup();
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    readyPage = await createPasswordPage.setPassword();
  } else {
    const seedBackupPromptPage = await welcomePage.createANewWallet();
    const revealSeedPage = await seedBackupPromptPage.revealYourRecoveryPhrase();
    const requiredWords: Array<string> = await revealSeedPage.getRequiredWords();
    const seedVerifyPage = await revealSeedPage.iveSavedTheseWords();
    createPasswordPage = await seedVerifyPage.verify(requiredWords);
    await createPasswordPage.enterPassword();
    await createPasswordPage.confirmPassword();
    readyPage = await createPasswordPage.setPassword();
  }
  const extensionString: string = await readyPage.getCurrentUrl();
  const extensionURL: URL = new URL(extensionString);
  DappDriver.Instance.Extension = `${extensionURL.protocol}//${extensionURL.host}`;
  await readyPage.closeAndSwitchToMainWindow<PageObject>(PageObject);
}
