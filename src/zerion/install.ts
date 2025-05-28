import {
  DEFAULT_ZERION_ASSET,
  DEFAULT_ZERION_VERSION,
  ZERION,
  ZERION_GITHUB_API,
  RECOMMENDED_ZERION_VERSIONS
} from '../constants';
import { logSuccess, logError, logInfo } from '../log';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadAssetZipFile,
  extractZipContents,
  fetchGithubRelease,
  fileExists,
  findGithubAsset,
  moveFiles
} from '../wallet/install';

export async function install(directory: string, version: string = DEFAULT_ZERION_VERSION): Promise<string> {
  try {
    const assetName = `${DEFAULT_ZERION_ASSET}-v${version}`;
    let destDir: string = `${directory}/${assetName}`;
    const exists = fileExists(destDir);
    if (exists) {
      logInfo(`Zerion version <v${version}> already exists in ${destDir}`);
      return destDir;
    }
    compareVersion(ZERION, version, RECOMMENDED_ZERION_VERSIONS);
    const release: any = await fetchGithubRelease(ZERION, version, ZERION_GITHUB_API);
    const asset: Asset = findGithubAsset(assetName, release);
    createDirectory(directory);
    const fileName: string = await downloadAssetZipFile(asset, directory);
    destDir = extractZipContents(fileName);
    moveFiles(destDir);
    logSuccess(`Installed Zerion version <v${version}>\n${destDir}`);
    return destDir;
  } catch (error: any) {
    logError(error.message);
  }
}
