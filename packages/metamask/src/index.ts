import { IWallet } from '@assert-equals/dappdriver';
import { install } from './install';
import { AddNetwork } from './pages/add-network';
import { Approve } from './pages/approve';
import { ApproveAll } from './pages/approve-all';
import { ConfirmTransaction } from './pages/confirm-transaction';
import { Connect } from './pages/connect';
import { Send } from './pages/send';
import { SignInRequest } from './pages/sign-in-request';
import { SignMessage } from './pages/sign-message';
import { SignatureRequest } from './pages/signature-request';
import { setup } from './setup';

export { AddNetwork } from './pages/add-network';
export { Approve } from './pages/approve';
export { ApproveAll } from './pages/approve-all';
export { ConfirmTransaction } from './pages/confirm-transaction';
export { Connect } from './pages/connect';
export { Home } from './pages/home';
export { Send } from './pages/send';
export { SignInRequest } from './pages/sign-in-request';
export { SignMessage } from './pages/sign-message';
export { SignatureRequest } from './pages/signature-request';
export { SidePanel } from './pages/home/SidePanel';
export { Completion } from './pages/onboarding/completion';
export { ConfirmRecoveryPhrase } from './pages/onboarding/confirm-recovery-phrase';
export { CreatePassword } from './pages/onboarding/create-password';
export { ImportWithRecoveryPhrase } from './pages/onboarding/import-with-recory-phrase';
export { Metametrics } from './pages/onboarding/metametrics';
export { ReviewRecoveryPhrase } from './pages/onboarding/review-recovery-phrase';
export { Welcome } from './pages/onboarding/welcome';
export { ConfirmAddSuggestedToken } from './pages/notification/confirm-add-suggested-token';
export const metamask: IWallet = {
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
export default metamask;
