import { WebDriverHTMLElement } from './html-element';
import { IInputText } from '../interface/input-text';
import { Key } from 'selenium-webdriver';

export class WebDriverInputText extends WebDriverHTMLElement implements IInputText {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async clear(): Promise<void> {
    await this.search();
    return await this.webElement.clear();
  }

  async focus(): Promise<void> {
    await this.search();
    return await this.webElement.sendKeys('');
  }

  async getText(): Promise<string> {
    await this.search();
    return await this.getValue();
  }

  async getValue(): Promise<string> {
    await this.search();
    return await this.webElement.getAttribute('value');
  }

  async type(keys: string): Promise<void> {
    await this.search();
    return await this.webElement.sendKeys(keys);
  }

  async typeAndEnter(keys: string): Promise<void> {
    await this.search();
    await this.webElement.sendKeys(keys);
    return await this.webElement.sendKeys(Key.ENTER);
  }

  async typeAndTab(keys: string): Promise<void> {
    await this.search();
    await this.webElement.sendKeys(keys);
    return await this.webElement.sendKeys(Key.TAB);
  }
}
