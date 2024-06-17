import {
  DEFAULT_ZERION_ASSET,
  DEFAULT_ZERION_VERSION,
  ZERION,
  ZERION_GITHUB_API,
  RECOMMENDED_ZERION_VERSIONS
} from '../constants';
import { logSuccess, logError } from '../log';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadAssetZipFile,
  extractZipContents,
  fetchGithubRelease,
  findGithubAsset,
  moveFiles
} from '../wallet/install';

export async function zerion(directory: string, version: string = DEFAULT_ZERION_VERSION): Promise<void> {
  try {
    const assetName = `${DEFAULT_ZERION_ASSET}-v${version}.zip`;
    compareVersion(ZERION, version, RECOMMENDED_ZERION_VERSIONS);
    const release: any = await fetchGithubRelease(ZERION, version, ZERION_GITHUB_API);
    const asset: Asset = findGithubAsset(assetName, release);
    createDirectory(directory);
    const fileName: string = await downloadAssetZipFile(asset, directory);
    const destDir = extractZipContents(fileName);
    moveFiles(destDir);
    logSuccess('Installed Zerion.');
  } catch (error: any) {
    logError(error.message);
  }
}
