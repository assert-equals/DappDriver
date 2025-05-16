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

export { ApproveRequest } from './pages/approve-request';
export { CreatePassword } from './pages/onboarding/create-password';
export { ImportOrConnect } from './pages/onboarding/import-or-connect';
export { ImportSeed } from './pages/onboarding/import-seed';
export { ImportSelect } from './pages/onboarding/import-select';
export { Import } from './pages/onboarding/import';
export { Ready } from './pages/onboarding/ready';
export { RevealSeed } from './pages/onboarding/reveal-seed';
export { SeedBackup } from './pages/onboarding/seed-backup';
export { SeedVerify } from './pages/onboarding/seed-verify';
export { Welcome } from './pages/onboarding/welcome';
export const rainbow: IWallet = {
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
export default rainbow;
