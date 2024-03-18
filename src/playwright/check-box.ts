import { ICheckBox } from '../interface/check-box';
import { PlaywrightHTMLElement } from './html-element';

export class PlaywrightCheckBox extends PlaywrightHTMLElement implements ICheckBox {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async isSelected(): Promise<boolean> {
    return await this.webElement.isChecked({ timeout: this.timeout });
  }

  async setValue(value: boolean): Promise<void> {
    await this.webElement.setChecked(value, { timeout: this.timeout });
  }
}
