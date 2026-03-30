import { Range } from 'semver';
import pkg from '../../package.json';

export const ZERION_PACKAGE_NAME: string = pkg.name;
export const ZERION: string = 'Zerion';
export const DEFAULT_ZERION_ASSET: string = 'zerion-wallet-extension';
export const DEFAULT_ZERION_VERSION: string = '1.36.0';
export const RECOMMENDED_ZERION_VERSIONS: Range = new Range('>=1.36.0 <2.0.0');
export const ZERION_GITHUB_API: string = 'https://api.github.com/repos/zeriontech/zerion-wallet-extension';
