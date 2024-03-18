import { IInputText } from '../interface/input-text';
import { PlaywrightHTMLElement } from './html-element';

export class PlaywrightInputText extends PlaywrightHTMLElement implements IInputText {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async clear(): Promise<void> {
    return await this.webElement.clear({ timeout: this.timeout });
  }

  async focus(): Promise<void> {
    return await this.webElement.focus({ timeout: this.timeout });
  }

  async getText(): Promise<string> {
    return await this.getValue();
  }

  async getValue(): Promise<string> {
    return await this.webElement.inputValue({ timeout: this.timeout });
  }

  async type(keys: string): Promise<void> {
    return await this.webElement.pressSequentially(keys, { timeout: this.timeout });
  }

  async typeAndEnter(keys: string): Promise<void> {
    await this.webElement.pressSequentially(keys, { timeout: this.timeout });
    return await this.webElement.press('Enter', { timeout: this.timeout });
  }

  async typeAndTab(keys: string): Promise<void> {
    await this.webElement.pressSequentially(keys, { timeout: this.timeout });
    return await this.webElement.press('Tab', { timeout: this.timeout });
  }
}
