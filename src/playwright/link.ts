import { ILink } from '../interface/link';
import { PlaywrightHTMLElement } from './html-element';

export class PlaywrightLink extends PlaywrightHTMLElement implements ILink {
  constructor(cssLocator: string) {
    super(cssLocator);
  }

  async location(): Promise<string> {
    return await this.webElement.getAttribute('href', { timeout: this.timeout });
  }
}
