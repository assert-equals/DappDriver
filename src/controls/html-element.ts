import { IHTMLElement } from '../interface/html-element';
import { DappDriver } from '../session/dapp-driver';
import { PlaywrightHTMLElement } from '../playwright/html-element';
import { WebDriverHTMLElement } from '../webdriver/html-element';
import { PageObject } from '../page';
import { PLAYWRIGHT, WEBDRIVER } from '../constants';

export class HTMLElement implements IHTMLElement {
  protected cssLocator: string;
  private element: any;
  private timeout: number;

  constructor(cssLocator: string, timeout: number = 20000, element: any = null) {
    this.cssLocator = cssLocator;
    this.element = element;
    this.timeout = timeout;
  }

  async callIfMethodExists(methodName: keyof IHTMLElement, args: Array<any> = []): Promise<any> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const d = new PlaywrightHTMLElement(this.cssLocator, this.timeout, this.element);
      return await (d[methodName] as Function)(...args);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      const d = new WebDriverHTMLElement(this.cssLocator, this.timeout, this.element);
      return await (d[methodName] as Function)(...args);
    }
  }

  async click(): Promise<void> {
    return this.callIfMethodExists('click');
  }

  async clickAndWait(duration: number = 1000): Promise<void> {
    return this.callIfMethodExists('clickAndWait', [duration]);
  }

  async clickAndOpensInNewWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.callIfMethodExists('clickAndOpensInNewWindow', [page]);
  }

  async clickAndRedirectsTo<TPage extends PageObject>(page: new () => TPage) {
    return this.callIfMethodExists('clickAndRedirectsTo', [page]);
  }

  async clickAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage) {
    return this.callIfMethodExists('clickAndSwitchToMainWindow', [page]);
  }

  async getAttribute(attribute: string): Promise<string | null> {
    return await this.callIfMethodExists('getAttribute', [attribute]);
  }

  async getCssValue(property: string): Promise<string | null> {
    return await this.callIfMethodExists('getCssValue', [property]);
  }

  async getText(): Promise<string> {
    return await this.callIfMethodExists('getText');
  }

  async hover(): Promise<void> {
    return this.callIfMethodExists('hover');
  }

  async isDisplayed(): Promise<boolean> {
    return await this.callIfMethodExists('isDisplayed');
  }

  async isEnabled(): Promise<boolean> {
    return await this.callIfMethodExists('isEnabled');
  }

  async isVisible(): Promise<boolean> {
    return await this.callIfMethodExists('isVisible');
  }

  async type(keys: string): Promise<void> {
    return this.callIfMethodExists('type', [keys]);
  }
}
