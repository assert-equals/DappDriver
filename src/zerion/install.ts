import {
  DEFAULT_ZERION_ASSET,
  DEFAULT_ZERION_VERSION,
  ZERION,
  ZERION_RELEASES,
  RECOMMENDED_ZERION_VERSIONS,
} from '../constants';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadZipFile,
  extractZipContents,
  fetchGithubRelease,
  findDownloadURL,
  moveFiles,
} from '../wallet/install';

export async function zerion(version: string = DEFAULT_ZERION_VERSION, directory: string): Promise<void> {
  try {
    compareVersion(ZERION, version, RECOMMENDED_ZERION_VERSIONS);
    const release: any = await fetchGithubRelease(ZERION, version, ZERION_RELEASES);
    const asset: Asset = findDownloadURL(DEFAULT_ZERION_ASSET, release, version);
    createDirectory(directory);
    const fileName: string = await downloadZipFile(asset, directory);
    const destDir = extractZipContents(fileName);
    moveFiles(destDir);
  } catch (error: any) {
    console.error('[ERROR]:', error.message);
  }
}
