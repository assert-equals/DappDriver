import { Range } from 'semver';
import pkg from '../../package.json';

export const METAMASK_PACKAGE_NAME: string = pkg.name;
export const METAMASK: string = 'MetaMask';
export const DEFAULT_METAMASK_ASSET: string = 'metamask-chrome';
export const DEFAULT_METAMASK_VERSION: string = '13.20.1';
export const RECOMMENDED_METAMASK_VERSIONS: Range = new Range('>=13.20.1 <14.0.0');
export const METAMASK_GITHUB_API: string = 'https://api.github.com/repos/metamask/metamask-extension';
