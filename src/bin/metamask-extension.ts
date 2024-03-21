#!/usr/bin/env node

import { Command } from 'commander';
import { installMetaMaskWallet } from '../metamask/install';
import { PACKAGE_VERSION, METAMASK, DEFAULT_VERSION, DEFAULT_CHANNEL, NODE_MODULE_DIR } from '../constants';
import { Wallet } from '../types';

const initCwd: string = process.env.INIT_CWD;
const cwd: string = process.cwd();
const downloadDir: string = `${initCwd || cwd}/${NODE_MODULE_DIR}`;

const program: Command = new Command();
program
  .version(PACKAGE_VERSION)
  .description('install wallet browser extensions')
  .option('-W, --wallet <value>', 'wallet to install for tests', METAMASK)
  .option('-R, --release <value>', 'release version to download', DEFAULT_VERSION)
  .option('-C, --channel <value>', 'name of the release channel', DEFAULT_CHANNEL)
  .option('-D, --directory <value>', 'path to the download directory', downloadDir);

program.parse(process.argv);
const { wallet, release, channel, directory }: { wallet: Wallet; release: string; channel: string; directory: string } =
  program.opts();

(async () => {
  switch (wallet) {
    case METAMASK:
      await installMetaMaskWallet(release, channel, directory);
      break;
    default:
      console.error('[ERROR]: Could not find the specified wallet: ' + wallet);
  }
})();
