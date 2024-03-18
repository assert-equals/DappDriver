import { WebDriverHTMLElement } from './html-element';
import { ILink } from '../interface/link';

export class WebDriverLink extends WebDriverHTMLElement implements ILink {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async location(): Promise<string> {
    await this.search();
    return await this.webElement.getAttribute('href');
  }
}
