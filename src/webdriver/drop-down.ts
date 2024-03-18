import { WebDriverHTMLElement } from './html-element';
import { IDropDown } from '../interface/drop-down';
import { Select } from 'selenium-webdriver/lib/select';

export class WebDriverDropDown extends WebDriverHTMLElement implements IDropDown {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async getSelectedOption(): Promise<string> {
    await this.search();
    const select = new Select(this.webElement);
    return (await select.getFirstSelectedOption()).getText();
  }

  async getText(): Promise<string> {
    return this.getSelectedOption();
  }

  async selectByIndex(index: number): Promise<void> {
    await this.search();
    const select = new Select(this.webElement);
    await select.selectByIndex(index);
  }

  async selectByText(text: string): Promise<void> {
    await this.search();
    const select = new Select(this.webElement);
    await select.selectByVisibleText(text);
  }

  async selectByValue(value: string): Promise<void> {
    await this.search();
    const select = new Select(this.webElement);
    await select.selectByValue(value);
  }
}
