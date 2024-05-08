import { WebDriverHTMLElement } from './html-element';
import { IRadio } from '../interface/controls/radio';

export class WebDriverRadio extends WebDriverHTMLElement implements IRadio {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async isSelected(): Promise<boolean> {
    await this.search();
    return await this.webElement.isSelected();
  }

  async select(): Promise<void> {
    await this.click();
  }
}
