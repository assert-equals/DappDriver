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

export { BackUp } from './pages/onboarding/backup';
export { ConfirmPassword } from './pages/onboarding/confirm-password';
export { ImportWallet } from './pages/onboarding/import-wallet';
export { Information } from './pages/onboarding/information';
export { Password } from './pages/onboarding/password';
export { RecoveryPhrase } from './pages/onboarding/recovery-phrase';
export { SelectWallets } from './pages/onboarding/select-wallets';
export { Success } from './pages/onboarding/success';
export { Verify } from './pages/onboarding/verify';
export { Welcome } from './pages/onboarding/welcome';
export const zerion: IWallet = {
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
export default zerion;
