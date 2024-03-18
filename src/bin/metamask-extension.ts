#!/usr/bin/env node

import { Command } from 'commander';
import { installMetaMaskWallet } from '../metamask/install';
import { PACKAGE_VERSION } from '../constants';

const program = new Command();
program
  .version(PACKAGE_VERSION)
  .description('install wallet browser extensions')
  .option('-w, --wallet <value>', 'wallet to install for tests')
  .option('-r, --release <value>', 'release version to download')
  .option('-c, --channel <value>', 'name of the release channel')
  .option('-d, --directory <value>', 'path to the download directory');

program.parse(process.argv);
const { wallet, release, channel, directory } = program.opts();

(async function () {
  switch (wallet) {
    case 'metamask':
      await installMetaMaskWallet(release, channel, directory);
      break;
    default:
      console.error('[ERROR]: Could not find the specified wallet: ' + wallet);
  }
})();
