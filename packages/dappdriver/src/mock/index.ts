import * as mockttp from 'mockttp';
import { PROXY_PORT } from '../constants';

/**
 *
 *
 * @export
 * @class MockServer
 */
export class MockServer {
  private server: mockttp.Mockttp;
  private port: number;
  /**
   * Creates an instance of MockServer.
   * @param {number} [port=PROXY_PORT]
   * @memberof MockServer
   */
  constructor(port: number = PROXY_PORT) {
    this.port = port;
  }
  /**
   *
   *
   * @readonly
   * @type {mockttp.Mockttp}
   * @memberof MockServer
   */
  get Server(): mockttp.Mockttp {
    return this.server;
  }
  /**
   *
   * Pass matched requests through to their real destination.
   * @return {*}  {Promise<void>}
   * @memberof MockServer
   */
  async passThrough(): Promise<void> {
    await this.server.forAnyRequest().thenPassThrough();
  }
  /**
   *
   * Initialize MockServer instance on the local machine.
   * @return {*}  {Promise<void>}
   * @memberof MockServer
   */
  async init(): Promise<void> {
    const https = await mockttp.generateCACertificate();
    this.server = mockttp.getLocal({ https, cors: true });
  }
  /**
   *
   * Start the mock server.
   * @return {*}  {Promise<void>}
   * @memberof MockServer
   */
  async start(): Promise<void> {
    await this.server.start(this.port);
  }
  /**
   *
   * Stop the mock server and reset all rules and subscriptions.
   * @return {*}  {Promise<void>}
   * @memberof MockServer
   */
  async stop(): Promise<void> {
    await this.server.stop();
  }
}
