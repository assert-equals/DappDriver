import { ILink } from '../interface/controls/link';
import { WebDriverHTMLElement } from './html-element';

export class WebDriverLink extends WebDriverHTMLElement implements ILink {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async location(): Promise<string> {
    await this.search();
    return await this.webElement.getAttribute('href');
  }
}
