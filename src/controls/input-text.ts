import { DappDriver } from '../session/dapp-driver';
import { IHTMLElement } from '../interface/html-element';
import { IInputText } from '../interface/input-text';
import { PlaywrightInputText } from '../playwright/input-text';
import { WebDriverInputText } from '../webdriver/input-text';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class InputText extends HTMLElement implements IInputText {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async callIfMethodExists(methodName: keyof IHTMLElement | keyof IInputText, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightInputText(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverInputText(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }

  async clear(): Promise<void> {
    return this.callIfMethodExists('clear');
  }

  async focus(): Promise<void> {
    return await this.callIfMethodExists('focus');
  }

  async getText(): Promise<string> {
    return await this.callIfMethodExists('getText');
  }

  async getValue(): Promise<string> {
    return await this.callIfMethodExists('getValue');
  }

  async type(keys: string): Promise<void> {
    return this.callIfMethodExists('type', [keys]);
  }

  async typeAndEnter(keys: string): Promise<void> {
    return this.callIfMethodExists('typeAndEnter', [keys]);
  }

  async typeAndTab(keys: string): Promise<void> {
    return this.callIfMethodExists('typeAndTab', [keys]);
  }
}
