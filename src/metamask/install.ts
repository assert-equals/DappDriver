import {
  DEFAULT_METAMASK_CHANNEL,
  DEFAULT_METAMASK_VERSION,
  METAMASK,
  METAMASK_RELEASES,
  RECOMMENDED_METAMASK_VERSIONS,
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

export async function metamask(
  version: string = DEFAULT_METAMASK_VERSION,
  channel: string = DEFAULT_METAMASK_CHANNEL,
  directory: string,
): Promise<void> {
  try {
    compareVersion(METAMASK, version, RECOMMENDED_METAMASK_VERSIONS);
    const release: any = await fetchGithubRelease(METAMASK, version, METAMASK_RELEASES);
    const asset: Asset = findDownloadURL(channel, release, version);
    createDirectory(directory);
    const fileName: string = await downloadZipFile(asset, directory);
    extractZipContents(fileName);
  } catch (error: any) {
    console.error('[ERROR]:', error.message);
  }
}
