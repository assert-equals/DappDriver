import { Locator } from 'playwright-core';
import { DappDriver } from '../session/dapp-driver';
import { HTMLElement } from '../controls/html-element';
import { Frame, Page } from '../types';

export class PlaywrightHTMLElementCollection {
  private cssLocator: string;
  private timeout: number;
  private page: Page;
  private frame: Frame;
  private webElements: Locator;
  private htmlElements: Array<HTMLElement> = new Array<HTMLElement>();

  constructor(cssLocator: string, timeout: number = 20000) {
    this.page = DappDriver.Instance.Page;
    this.frame = DappDriver.Instance.Frame;
    this.timeout = timeout;
    this.webElements = !this.frame ? this.page.locator(cssLocator) : this.frame.locator(cssLocator);
  }

  async elements(): Promise<Array<HTMLElement>> {
    (await this.webElements.all()).forEach((element) =>
      this.htmlElements.push(new HTMLElement(this.cssLocator, this.timeout, element)),
    );
    return this.htmlElements;
  }
}
