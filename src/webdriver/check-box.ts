import { WebDriverHTMLElement } from './html-element';
import { ICheckBox } from '../interface/controls/check-box';

export class WebDriverCheckBox extends WebDriverHTMLElement implements ICheckBox {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async isSelected(): Promise<boolean> {
    await this.search();
    return this.webElement.isSelected();
  }

  async setValue(value: boolean): Promise<void> {
    const isSelected = await this.isSelected();
    if (isSelected) {
      if (!value) {
        await this.click();
      }
    } else {
      if (value) {
        await this.click();
      }
    }
  }
}
