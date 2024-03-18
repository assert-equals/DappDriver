import { WebDriver, WebElement } from 'selenium-webdriver';
import { DappDriver } from '../session/dapp-driver';
import { HTMLElement } from '../controls/html-element';

export class WebDriverHTMLElementCollection {
  private cssLocator: string;
  private timeout: number;
  private driver: WebDriver;
  private webElements: Array<WebElement>;
  private htmlElements: Array<HTMLElement> = new Array<HTMLElement>();

  constructor(cssLocator: string, timeout: number = 20000) {
    this.cssLocator = cssLocator;
    this.driver = DappDriver.Instance.Driver as WebDriver;
    this.timeout = timeout;
    this.webElements = null;
  }

  private async search(): Promise<void> {
    await this.driver.manage().setTimeouts({ implicit: this.timeout });
    this.webElements = await this.driver.findElements({ css: this.cssLocator });
    await this.driver.manage().setTimeouts({ implicit: 20000 });
  }

  async elements(): Promise<Array<HTMLElement>> {
    await this.search();
    this.webElements.forEach((element) =>
      this.htmlElements.push(new HTMLElement(this.cssLocator, this.timeout, element)),
    );
    return this.htmlElements;
  }
}
