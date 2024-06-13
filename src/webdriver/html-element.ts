import { WebDriver, WebElement, WebElementPromise, error, until } from 'selenium-webdriver';
import { IHTMLElement } from '../interface/controls/html-element';
import { DappDriver } from '../session/dapp-driver';
import { PageObject } from '../page';
import { logWarning } from '../log';
import { IConfirmation } from '../interface/wallet/confirmation';

export class WebDriverHTMLElement implements IHTMLElement {
  private cssLocator: string;
  protected driver: WebDriver;
  protected webElement: WebElement;
  private element: WebElementPromise;
  private timeout: number;

  constructor(cssLocator: string, timeout: number = 20000, element: WebElementPromise = null) {
    this.cssLocator = cssLocator;
    this.driver = DappDriver.Instance.Driver as WebDriver;
    this.element = element;
    this.timeout = timeout;
    this.webElement = null;
  }

  async search(): Promise<void> {
    await this.driver.manage().setTimeouts({ implicit: this.timeout });
    if (this.cssLocator.startsWith('xpath=')) {
      this.webElement = !this.element
        ? await this.driver.findElement({ xpath: this.cssLocator.substring(6, this.cssLocator.length) })
        : await this.element;
    } else {
      this.webElement = !this.element ? await this.driver.findElement({ css: this.cssLocator }) : await this.element;
    }
    await this.driver.manage().setTimeouts({ implicit: 20000 });
  }

  async hardClick(): Promise<void> {
    await this.search();
    await this.driver.wait(until.elementIsVisible(this.webElement), 10000);
    await this.driver.wait(until.elementIsEnabled(this.webElement), 10000);
    await this.webElement.click();
  }

  async click<TPage>(page?: new () => TPage): Promise<any> {
    try {
      await this.hardClick();
    } catch (err) {
      if (err instanceof error.StaleElementReferenceError) {
        logWarning(err.name + ': ' + this.cssLocator);
        await this.hardClick();
      }
    }
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async clickAndWait(duration: number): Promise<void> {
    await this.click();
    return this.driver.actions({ async: true }).pause(duration).perform();
  }

  async clickAndOpensInExtension<TPage extends IConfirmation>(page?: new () => TPage): Promise<any> {
    await this.click();
    await new PageObject().opensInExtension();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async clickAndOpensInNewWindow<TPage>(page?: new () => TPage): Promise<any> {
    await this.click();
    await new PageObject().opensInNewWindow();
    if (page) {
      return DappDriver.getPage<TPage>(page);
    }
  }

  async clickAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    const handle: string = await new PageObject().getWindowHandle();
    await this.click();
    const timeout: number = 10_000;
    const delay: number = 100;
    let timeElapsed: number = 0;
    let windowHandles: Array<string> = [];
    while (timeElapsed <= timeout) {
      windowHandles = await new PageObject().getAllWindowHandles();
      if (!windowHandles.includes(handle)) {
        await new PageObject().switchToMainWindow();
        if (page) {
          return DappDriver.getPage<TPage>(page);
        }
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      timeElapsed += delay;
    }
    throw new Error('clickAndSwitchToMainWindow timed out waiting for the current window to close');
  }

  async getAttribute(attribute: string): Promise<string | null> {
    await this.search();
    return await this.webElement.getAttribute(attribute);
  }

  async getCssValue(property: string): Promise<string | null> {
    await this.search();
    return await this.webElement.getCssValue(property);
  }

  async getText(): Promise<string> {
    await this.search();
    return await this.webElement.getText();
  }

  async hover(): Promise<void> {
    await this.search();
    return this.driver.actions({ async: true }).move({ origin: this.webElement }).perform();
  }

  async isDisplayed(): Promise<boolean> {
    try {
      await this.search();
      return true;
    } catch (ex) {
      return false;
    }
  }

  async isEnabled(): Promise<boolean> {
    await this.search();
    return await this.webElement.isEnabled();
  }

  async isVisible(): Promise<boolean> {
    await this.search();
    return await this.webElement.isDisplayed();
  }

  async type(keys: string): Promise<void> {
    await this.search();
    await this.webElement.sendKeys(keys);
  }
}
