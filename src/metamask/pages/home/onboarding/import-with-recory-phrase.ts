import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
import { CreatePassword } from './create-password';

export class ImportWithRecoveryPhrase extends PageObject {
  private srpInput: (index: number) => HTMLElement = (index: number) =>
    new HTMLElement(`[data-testid="import-srp__srp-word-${index}"]`);
  private confirmButton: () => HTMLElement = () => new HTMLElement('[data-testid="import-srp-confirm"]');

  constructor() {
    super('/home.html#onboarding/import-with-recovery-phrase', 'MetaMask');
  }

  async enterSRP(srp: string): Promise<void> {
    const words: Array<string> = srp.split(' ');
    for (const word of words) {
      await this.srpInput(words.indexOf(word)).type(word);
    }
  }

  async confirmSecretRecoveryPhrase(): Promise<CreatePassword> {
    return await this.confirmButton().clickAndRedirectsTo<CreatePassword>(CreatePassword);
  }
}
