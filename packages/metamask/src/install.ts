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
  logSuccess
} from '@assert-equals/dappdriver';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_METAMASK_ASSET,
  DEFAULT_METAMASK_VERSION,
  METAMASK,
  METAMASK_GITHUB_API,
  METAMASK_PACKAGE_NAME,
  RECOMMENDED_METAMASK_VERSIONS
} from './constants';

export async function install(directory: string, version: string = DEFAULT_METAMASK_VERSION): Promise<string> {
  const assetName = `${DEFAULT_METAMASK_ASSET}-${version}`;
  let destDir: string = `${directory}/${assetName}`;
  const exists = fileExists(destDir);
  if (exists) {
    logInfo(`MetaMask version <v${version}> already exists in ${destDir}`);
    return destDir;
  }
  compareVersion(METAMASK, version, RECOMMENDED_METAMASK_VERSIONS);
  const release: any = await fetchGithubRelease(METAMASK, version, METAMASK_GITHUB_API, METAMASK_PACKAGE_NAME);
  const asset: Asset = findGithubAsset(assetName, release);
  createDirectory(directory);
  const fileName: string = await downloadAssetZipFile(asset, directory);
  destDir = extractZipContents(fileName);
  await enableMetaMaskAutomation(destDir);
  logSuccess(`Installed MetaMask version <v${version}>\n${destDir}`);
  return destDir;
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
