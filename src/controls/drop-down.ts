import { DappDriver } from '../session/dapp-driver';
import { IDropDown } from '../interface/drop-down';
import { IHTMLElement } from '../interface/html-element';
import { PlaywrightDropDown } from '../playwright/drop-down';
import { WebDriverDropDown } from '../webdriver/drop-down';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class DropDown extends HTMLElement implements IDropDown {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async callIfMethodExists(methodName: keyof IHTMLElement | keyof IDropDown, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightDropDown(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverDropDown(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }

  async getSelectedOption(): Promise<string> {
    return this.callIfMethodExists('getSelectedOption');
  }

  async selectByIndex(index: number): Promise<void> {
    return this.callIfMethodExists('selectByIndex', [index]);
  }

  async selectByText(text: string): Promise<void> {
    return this.callIfMethodExists('selectByText', [text]);
  }

  async selectByValue(value: string): Promise<void> {
    return this.callIfMethodExists('selectByValue', [value]);
  }
}
