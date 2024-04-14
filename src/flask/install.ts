import {
  DEFAULT_METAMASK_FLASK_ASSET,
  DEFAULT_METAMASK_FLASK_VERSION,
  METAMASK_FLASK,
  METAMASK_RELEASES,
  RECOMMENDED_METAMASK_FLASK_VERSIONS,
} from '../constants';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadZipFile,
  extractZipContents,
  fetchGithubRelease,
  findDownloadURL,
} from '../wallet/install';

export async function metamaskFlask(
  version: string = DEFAULT_METAMASK_FLASK_VERSION,
  directory: string,
): Promise<void> {
  try {
    compareVersion(METAMASK_FLASK, version, RECOMMENDED_METAMASK_FLASK_VERSIONS);
    const release: any = await fetchGithubRelease(METAMASK_FLASK, version, METAMASK_RELEASES);
    const asset: Asset = findDownloadURL(DEFAULT_METAMASK_FLASK_ASSET, release, version);
    createDirectory(directory);
    const fileName: string = await downloadZipFile(asset, directory);
    extractZipContents(fileName);
  } catch (error: any) {
    console.error('[ERROR]:', error.message);
  }
}
