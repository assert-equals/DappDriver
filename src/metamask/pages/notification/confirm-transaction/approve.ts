import { ConfirmTransaction } from '.';

export class Approve extends ConfirmTransaction {
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/approve/), 'MetaMask');
  }

  next(): Promise<void> {
    return this.nextButton().clickAndWait();
  }
}
