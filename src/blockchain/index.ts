import ganache, { Server, ServerOptions } from 'ganache';
/**
 *
 *
 * @export
 * @class Node
 */
export class Node {
  private server: Server<any>;
  private defaultOptions: ServerOptions = {
    wallet: {
      mnemonic: 'phrase upgrade clock rough situate wedding elder clever doctor stamp excess tent',
      defaultBalance: 100,
    },
    chain: {
      hardfork: 'london',
      networkId: 1337,
    },
    logging: {
      quiet: true,
    },
  };
  /**
   *
   *
   * @param {ServerOptions} [customOptions={}]
   * @memberof Node
   */
  async start(customOptions: ServerOptions = {}) {
    const options: ServerOptions = { ...this.defaultOptions, ...customOptions };
    this.server = ganache.server(options);
    await this.server.listen(8545);
  }
  /**
   *
   *
   * @memberof Node
   */
  async stop() {
    await this.server.close();
  }
}
