import { DappDriver } from '../session/dapp-driver';
import { IHTMLElement } from '../interface/html-element';
import { IRadio } from '../interface/radio';
import { PlaywrightRadio } from '../playwright/radio';
import { WebDriverRadio } from '../webdriver/radio';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class Radio extends HTMLElement implements IRadio {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async callIfMethodExists(methodName: keyof IHTMLElement | keyof IRadio, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightRadio(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverRadio(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }

  async isSelected(): Promise<boolean> {
    return await this.callIfMethodExists('isSelected');
  }

  async select(): Promise<void> {
    return this.callIfMethodExists('select');
  }
}
