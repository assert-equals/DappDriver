#!/usr/bin/env node

import { Command } from 'commander';
import { PACKAGE_VERSION, METAMASK, METAMASK_FLASK, NODE_MODULE_DIR, ZERION, RAINBOW } from '../constants';
import { Wallet } from '../types';
import { metamask } from '../metamask/install';
import { zerion } from '../zerion/install';
import { metamaskFlask } from '../flask/install';
import { rainbow } from '../rainbow/install';

const initCwd: string = process.env.INIT_CWD;
const cwd: string = process.cwd();
const downloadDir: string = `${initCwd || cwd}/${NODE_MODULE_DIR}`;

const program: Command = new Command();
program
  .version(PACKAGE_VERSION, '-v, --version', 'output the current version')
  .description('download wallet browser extensions')
  .option('-w, --wallet <value>', 'wallet to install for tests', METAMASK)
  .option('-r, --release <value>', 'release version to download')
  .option('-d, --directory <value>', 'path to the download directory', downloadDir);

program.parse(process.argv);
const { wallet, release, directory }: { wallet: Wallet; release: string; directory: string } = program.opts();

(async () => {
  switch (wallet) {
    case METAMASK:
      await metamask(release, directory);
      break;
    case METAMASK_FLASK:
      await metamaskFlask(release, directory);
      break;
    case RAINBOW:
      await rainbow(release, directory);
      break;
    case ZERION:
      await zerion(release, directory);
      break;
    default:
      console.error(`[ERROR]: Could not find the specified wallet (${wallet}).`);
  }
})();
