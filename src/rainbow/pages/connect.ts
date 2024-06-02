import { IConnect } from '../../interface/wallet/connect';
import { ApproveRequest } from './approve-request';

export class Connect extends ApproveRequest implements IConnect {
  constructor() {
    super();
  }
}
