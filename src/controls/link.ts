import { DappDriver } from '../session/dapp-driver';
import { IHTMLElement } from '../interface/html-element';
import { ILink } from '../interface/link';
import { PlaywrightLink } from '../playwright/link';
import { WebDriverLink } from '../webdriver/link';
import { HTMLElement } from './html-element';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class Link extends HTMLElement implements ILink {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async callIfMethodExists(methodName: keyof IHTMLElement | keyof ILink, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightLink(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverLink(this.cssLocator);
      return await (d[methodName] as Function)(...args);
    }
  }

  async location(): Promise<string> {
    return await this.callIfMethodExists('location');
  }
}
