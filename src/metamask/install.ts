import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import {
  DEFAULT_METAMASK_ASSET,
  DEFAULT_METAMASK_VERSION,
  METAMASK,
  METAMASK_GITHUB_API,
  RECOMMENDED_METAMASK_VERSIONS
} from '../constants';
import { logError, logInfo, logSuccess } from '../log';
import { Asset } from '../types';
import {
  compareVersion,
  createDirectory,
  downloadAssetZipFile,
  extractZipContents,
  fetchGithubRelease,
  fileExists,
  findGithubAsset
} from '../wallet/install';

export async function install(directory: string, version: string = DEFAULT_METAMASK_VERSION): Promise<void> {
  try {
    const assetName = `${DEFAULT_METAMASK_ASSET}-${version}.zip`;
    const exists = fileExists(directory, assetName);
    if (exists) {
      logInfo(`MetaMask version <v${version}> already exists in ${directory}/${assetName}`);
      return;
    }
    compareVersion(METAMASK, version, RECOMMENDED_METAMASK_VERSIONS);
    const release: any = await fetchGithubRelease(METAMASK, version, METAMASK_GITHUB_API);
    const asset: Asset = findGithubAsset(assetName, release);
    createDirectory(directory);
    const fileName: string = await downloadAssetZipFile(asset, directory);
    const destDir: string = extractZipContents(fileName);
    await enableMetaMaskAutomation(destDir);
    logSuccess(`Installed MetaMask version <v${version}>\n${destDir}`);
  } catch (error: any) {
    logError(error.message);
  }
}

export async function enableMetaMaskAutomation(metaMaskPath: string): Promise<void> {
  const runtimeLavaMoatPath = path.resolve(metaMaskPath, 'scripts', 'runtime-lavamoat.js');
  const file = readFileSync(runtimeLavaMoatPath, 'utf8');
  const updatedRuntimeLavaMoatData = file.replace(
    `"scuttleGlobalThis":{"enabled":true`,
    `"scuttleGlobalThis":{"enabled":false`
  );
  writeFileSync(runtimeLavaMoatPath, updatedRuntimeLavaMoatData);
}
