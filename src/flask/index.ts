import { IWallet } from '../interface/extension/wallet';
import { AddNetwork } from '../metamask/pages/add-network';
import { Approve } from '../metamask/pages/approve';
import { ApproveAll } from '../metamask/pages/approve-all';
import { ConfirmTransaction } from '../metamask/pages/confirm-transaction';
import { Connect } from '../metamask/pages/connect';
import { Send } from '../metamask/pages/send';
import { SignInRequest } from '../metamask/pages/sign-in-request';
import { SignMessage } from '../metamask/pages/sign-message';
import { SignatureRequest } from '../metamask/pages/signature-request';
import { install } from './install';
import { setup } from './setup';

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
