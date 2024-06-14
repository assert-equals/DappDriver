import {
  DEFAULT_METAMASK_ASSET,
  DEFAULT_METAMASK_VERSION,
  METAMASK,
  METAMASK_GITHUB_API,
  RECOMMENDED_METAMASK_VERSIONS,
} from '../constants';
import { logError, logSuccess } from '../log';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadAssetZipFile,
  extractZipContents,
  fetchGithubRelease,
  findGithubAsset,
} from '../wallet/install';

export async function metamask(directory: string, version: string = DEFAULT_METAMASK_VERSION): Promise<void> {
  try {
    const assetName = `${DEFAULT_METAMASK_ASSET}-${version}.zip`;
    compareVersion(METAMASK, version, RECOMMENDED_METAMASK_VERSIONS);
    const release: any = await fetchGithubRelease(METAMASK, version, METAMASK_GITHUB_API);
    const asset: Asset = findGithubAsset(assetName, release);
    createDirectory(directory);
    const fileName: string = await downloadAssetZipFile(asset, directory);
    extractZipContents(fileName);
    logSuccess('Installed MetaMask.');
  } catch (error: any) {
    logError(error.message);
  }
}
