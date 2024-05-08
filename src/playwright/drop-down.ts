import { IDropDown } from '../interface/controls/drop-down';
import { PlaywrightHTMLElement } from './html-element';

export class PlaywrightDropDown extends PlaywrightHTMLElement implements IDropDown {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async getSelectedOption(): Promise<string> {
    return this.webElement.locator('option:checked').textContent({ timeout: this.timeout });
  }

  async getText(): Promise<string> {
    return this.getSelectedOption();
  }

  async selectByIndex(index: number): Promise<void> {
    await this.webElement.selectOption({ index: index }, { timeout: this.timeout });
  }

  async selectByText(text: string): Promise<void> {
    await this.webElement.selectOption({ label: text }, { timeout: this.timeout });
  }

  async selectByValue(value: string): Promise<void> {
    await this.webElement.selectOption({ value: value }, { timeout: this.timeout });
  }
}
