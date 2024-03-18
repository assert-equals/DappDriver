import { DappDriver } from '../session/dapp-driver';
import { ICheckBox } from '../interface/check-box';
import { IHTMLElement } from '../interface/html-element';
import { PlaywrightCheckBox } from '../playwright/check-box';
import { WebDriverCheckBox } from '../webdriver/check-box';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class CheckBox extends HTMLElement implements ICheckBox {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async callIfMethodExists(methodName: keyof IHTMLElement | keyof ICheckBox, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightCheckBox(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverCheckBox(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }

  async setValue(value: boolean): Promise<void> {
    return this.callIfMethodExists('setValue', [value]);
  }

  async isSelected(): Promise<boolean> {
    return await this.callIfMethodExists('isSelected');
  }
}
