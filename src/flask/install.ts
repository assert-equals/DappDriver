import {
  DEFAULT_METAMASK_FLASK_ASSET,
  DEFAULT_METAMASK_FLASK_VERSION,
  METAMASK_FLASK,
  METAMASK_GITHUB_API,
  RECOMMENDED_METAMASK_FLASK_VERSIONS,
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

export async function metamaskFlask(
  version: string = DEFAULT_METAMASK_FLASK_VERSION,
  directory: string,
): Promise<void> {
  try {
    const assetName = `${DEFAULT_METAMASK_FLASK_ASSET}-${version}-flask.0.zip`;
    compareVersion(METAMASK_FLASK, version, RECOMMENDED_METAMASK_FLASK_VERSIONS);
    const release: any = await fetchGithubRelease(METAMASK_FLASK, version, METAMASK_GITHUB_API);
    const asset: Asset = findGithubAsset(assetName, release);
    createDirectory(directory);
    const fileName: string = await downloadAssetZipFile(asset, directory);
    extractZipContents(fileName);
  } catch (error: any) {
    console.error('[ERROR]:', error.message);
  }
}
