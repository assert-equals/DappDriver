import { ISignatureRequest } from '../../interface/wallet/signature-request';
import { ApproveRequest } from './approve-request';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @extends {ApproveRequest}
 * @implements {ISignatureRequest}
 */
export class SignatureRequest extends ApproveRequest implements ISignatureRequest {
  /**
   * Creates an instance of SignatureRequest.
   * @memberof SignatureRequest
   */
  constructor() {
    super();
  }
}
