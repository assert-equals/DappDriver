import { IRadio } from '../interface/radio';
import { PlaywrightHTMLElement } from './html-element';

export class PlaywrightRadio extends PlaywrightHTMLElement implements IRadio {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async isSelected(): Promise<boolean> {
    return await this.webElement.isChecked({ timeout: this.timeout });
  }

  async select(): Promise<void> {
    await this.click();
  }
}
