import { IConfirmation } from '../wallet/confirmation';

export interface IWallet {
  pages: {
    AddNetwork: new () => IConfirmation;
    ApproveAll: new () => IConfirmation;
    Approve: new () => IConfirmation;
    ConfirmTransaction: new () => IConfirmation;
    Connect: new () => IConfirmation;
    Send: new () => IConfirmation;
    SignInRequest: new () => IConfirmation;
    SignMessage: new () => IConfirmation;
    SignatureRequest: new () => IConfirmation;
  };
  setup(seed: string): Promise<void>;
  install(directory: string, version: string): Promise<void>;
}
