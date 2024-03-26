#!/usr/bin/env node

import { Command } from 'commander';
import { PACKAGE_VERSION, METAMASK, NODE_MODULE_DIR, ZERION } from '../constants';
import { Wallet } from '../types';
import { metamask } from '../metamask/install';
import { zerion } from '../zerion/install';

const initCwd: string = process.env.INIT_CWD;
const cwd: string = process.cwd();
const downloadDir: string = `${initCwd || cwd}/${NODE_MODULE_DIR}`;

const program: Command = new Command();
program
  .version(PACKAGE_VERSION)
  .description('install wallet browser extensions')
  .option('-W, --wallet <value>', 'wallet to install for tests', METAMASK)
  .option('-R, --release <value>', 'release version to download')
  .option('-C, --channel <value>', 'name of the release channel')
  .option('-D, --directory <value>', 'path to the download directory', downloadDir);

program.parse(process.argv);
const { wallet, release, channel, directory }: { wallet: Wallet; release: string; channel: string; directory: string } =
  program.opts();

(async () => {
  switch (wallet) {
    case METAMASK:
      await metamask(release, channel, directory);
      break;
    case ZERION:
      await zerion(release, channel, directory);
      break;
    default:
      console.error('[ERROR]: Could not find the specified wallet: ' + wallet);
  }
})();
