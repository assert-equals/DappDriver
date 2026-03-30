import { Range } from 'semver';
import pkg from '../../package.json';

export const RAINBOW_PACKAGE_NAME: string = pkg.name;
export const RAINBOW: string = 'Rainbow';
export const DEFAULT_RAINBOW_ASSET: string = 'rainbowbx-chrome';
export const DEFAULT_RAINBOW_VERSION: string = '1.5.202';
export const RECOMMENDED_RAINBOW_VERSIONS: Range = new Range('>=1.5.202 <1.6.0');
export const RAINBOW_GITHUB_API: string = 'https://api.github.com/repos/rainbow-me/browser-extension';
