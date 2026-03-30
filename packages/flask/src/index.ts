import { IWallet } from '@assert-equals/dappdriver';
import {
  AddNetwork,
  Approve,
  ApproveAll,
  ConfirmTransaction,
  Connect,
  Send,
  SignInRequest,
  SignMessage,
  SignatureRequest
} from '@assert-equals/dappdriver-metamask';
import { install } from './install';
import { setup } from './setup';

export {
  AddNetwork,
  Approve,
  ApproveAll,
  ConfirmTransaction,
  Connect,
  Send,
  SignInRequest,
  SignMessage,
  SignatureRequest
} from '@assert-equals/dappdriver-metamask';
export { ExperimentalArea } from './pages/onboarding/experimental-area';
export const flask: IWallet = {
  pages: {
    AddNetwork,
    ApproveAll,
    Approve,
    ConfirmTransaction,
    Connect,
    Send,
    SignInRequest,
    SignMessage,
    SignatureRequest
  },
  setup,
  install
};
export default flask;
