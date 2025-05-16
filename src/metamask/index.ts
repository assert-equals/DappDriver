import { IWallet } from '../interface/extension/wallet';
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

export { Home } from './pages/home';
export { Completion } from './pages/onboarding/completion';
export { ConfirmRecoveryPhrase } from './pages/onboarding/confirm-recovery-phrase';
export { CreatePassword } from './pages/onboarding/create-password';
export { ImportWithRecoveryPhrase } from './pages/onboarding/import-with-recory-phrase';
export { Metametrics } from './pages/onboarding/metametrics';
export { PinExtension } from './pages/onboarding/pin-extension';
export { ReviewRecoveryPhrase } from './pages/onboarding/review-recovery-phrase';
export { SecureYourWallet } from './pages/onboarding/secure-your-wallet';
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
