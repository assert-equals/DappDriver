import {
  Asset,
  compareVersion,
  createDirectory,
  downloadAssetZipFile,
  extractZipContents,
  fetchGithubRelease,
  fileExists,
  findGithubAsset,
  logInfo,
  logSuccess,
  moveFiles
} from '@assert-equals/dappdriver';
import {
  DEFAULT_ZERION_ASSET,
  DEFAULT_ZERION_VERSION,
  RECOMMENDED_ZERION_VERSIONS,
  ZERION,
  ZERION_GITHUB_API,
  ZERION_PACKAGE_NAME
} from './constants';

export async function install(directory: string, version: string = DEFAULT_ZERION_VERSION): Promise<string> {
  const assetName = `${DEFAULT_ZERION_ASSET}-v${version}`;
  let destDir: string = `${directory}/${assetName}`;
  const exists = fileExists(destDir);
  if (exists) {
    logInfo(`Zerion version <v${version}> already exists in ${destDir}`);
    return destDir;
  }
  compareVersion(ZERION, version, RECOMMENDED_ZERION_VERSIONS);
  const release: any = await fetchGithubRelease(ZERION, version, ZERION_GITHUB_API, ZERION_PACKAGE_NAME);
  const asset: Asset = findGithubAsset(assetName, release);
  createDirectory(directory);
  const fileName: string = await downloadAssetZipFile(asset, directory);
  destDir = extractZipContents(fileName);
  moveFiles(destDir);
  logSuccess(`Installed Zerion version <v${version}>\n${destDir}`);
  return destDir;
}
