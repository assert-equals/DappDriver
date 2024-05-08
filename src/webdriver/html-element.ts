import { WebDriver, WebElement, WebElementPromise, error, until } from 'selenium-webdriver';
import { IHTMLElement } from '../interface/controls/html-element';
import { DappDriver } from '../session/dapp-driver';
import { PageObject } from '../page';

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

  async click(): Promise<void> {
    try {
      await this.hardClick();
    } catch (err) {
      if (err instanceof error.StaleElementReferenceError) {
        console.log(err.name + ': ' + this.cssLocator);
        await this.hardClick();
      }
    }
  }

  async clickAndWait(duration: number): Promise<void> {
    await this.click();
    return this.driver.actions({ async: true }).pause(duration).perform();
  }

  async clickAndOpensInNewWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.click();
    await new PageObject().opensInNewWindow();
    return DappDriver.getPage(page);
  }

  async clickAndRedirectsTo<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.click();
    return DappDriver.getPage(page);
  }

  async clickAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    await this.click();
    await new PageObject().switchToMainWindow();
    return DappDriver.getPage(page);
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
