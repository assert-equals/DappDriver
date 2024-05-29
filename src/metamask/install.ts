import {
  DEFAULT_METAMASK_ASSET,
  DEFAULT_METAMASK_VERSION,
  METAMASK,
  METAMASK_GITHUB_API,
  RECOMMENDED_METAMASK_VERSIONS,
} from '../constants';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadAssetZipFile,
  extractZipContents,
  fetchGithubRelease,
  findGithubAsset,
} from '../wallet/install';

export async function metamask(version: string = DEFAULT_METAMASK_VERSION, directory: string): Promise<void> {
  try {
    const assetName = `${DEFAULT_METAMASK_ASSET}-${version}.zip`;
    compareVersion(METAMASK, version, RECOMMENDED_METAMASK_VERSIONS);
    const release: any = await fetchGithubRelease(METAMASK, version, METAMASK_GITHUB_API);
    const asset: Asset = findGithubAsset(assetName, release);
    createDirectory(directory);
    const fileName: string = await downloadAssetZipFile(asset, directory);
    extractZipContents(fileName);
  } catch (error: any) {
    console.error('[ERROR]:', error.message);
  }
}
