import { ConfirmTransaction } from '.';
import { HTMLElement } from '../../../../controls/html-element';

export class SignatureRequest extends ConfirmTransaction {
  private scrollButton: () => HTMLElement = () => new HTMLElement('[data-testid="signature-request-scroll-button"]');

  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/signature-request/), 'MetaMask');
  }

  scroll(): Promise<void> {
    return this.scrollButton().click();
  }
}
