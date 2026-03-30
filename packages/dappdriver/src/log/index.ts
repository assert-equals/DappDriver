/* eslint-disable no-console */
import chalk from 'chalk';

export function logError(message: string) {
  console.log(chalk.red('[error]'), message);
}

export function logInfo(message: string) {
  console.log(chalk.blue('[info]'), message);
}

export function logSuccess(message: string) {
  console.log(chalk.green('[success]'), message);
}

export function logWarning(message: string) {
  console.log(chalk.yellow('[warning]'), message);
}
