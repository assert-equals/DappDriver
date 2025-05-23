import { Locator } from 'playwright-core';
import { IHTMLElement } from '../interface/controls/html-element';
import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PageObject } from '../page';
import { DappDriver } from '../session/dapp-driver';
import { Frame, Page } from '../types';

export class PlaywrightHTMLElement implements IHTMLElement {
  protected page: Page;
  protected frame: Frame;
  protected webElement: Locator;
  private element: Locator;
  protected timeout: number;

  constructor(cssLocator: string, timeout: number = 20000, element: any = null) {
    this.page = DappDriver.Instance.Page;
    this.frame = DappDriver.Instance.Frame;
    this.element = element;
    this.timeout = timeout;
    this.webElement = this.getWebElement(cssLocator);
  }

  getWebElement(cssLocator: string): Locator {
    let locator: Locator;
    if (this.element) {
      locator = this.element;
    } else {
      locator = !this.frame ? this.page.locator(cssLocator) : this.frame.locator(cssLocator);
    }
    return locator;
  }

  async click<TPage>(page?: new () => TPage): Promise<any> {
    await this.webElement.click({ timeout: this.timeout });
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async clickAndWait(duration: number): Promise<void> {
    await this.click();
    await DappDriver.sleep(duration);
  }

  async clickAndOpensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    await this.click();
    await new PageObject().opensInNewWindow();
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async clickAndOpensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<any> {
    await this.click();
    return await new PageObject().opensInWindow(page);
  }

  async clickAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    await this.click();
    await new PageObject().switchToMainWindow();
    if (page) {
      return await DappDriver.getPage<TPage>(page);
    }
  }

  async getAttribute(attribute: string): Promise<string | null> {
    return await this.webElement.getAttribute(attribute, { timeout: this.timeout });
  }

  async getCssValue(property: string): Promise<string | null> {
    return await this.webElement.evaluate(
      (element, property) => window.getComputedStyle(element).getPropertyValue(property),
      property
    );
  }

  async getText(): Promise<string> {
    return await this.webElement.innerText({ timeout: this.timeout });
  }

  async hover(): Promise<void> {
    return await this.webElement.hover({ timeout: this.timeout });
  }

  async isDisplayed(): Promise<boolean> {
    return (await this.webElement.count()) > 0;
  }

  async isEnabled(): Promise<boolean> {
    return await this.webElement.isEnabled({ timeout: this.timeout });
  }

  async isVisible(): Promise<boolean> {
    return await this.webElement.isVisible({ timeout: this.timeout });
  }

  async type(keys: string): Promise<void> {
    await this.webElement.pressSequentially(keys, { timeout: this.timeout });
  }

  async waitForText(text: RegExp): Promise<void> {
    await this.webElement.filter({ hasText: text }).waitFor({ timeout: this.timeout });
  }
}
