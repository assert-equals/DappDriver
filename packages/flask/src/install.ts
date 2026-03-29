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
  DEFAULT_METAMASK_FLASK_ASSET,
  DEFAULT_METAMASK_FLASK_VERSION,
  METAMASK_FLASK,
  METAMASK_FLASK_PACKAGE_NAME,
  METAMASK_GITHUB_API,
  RECOMMENDED_METAMASK_FLASK_VERSIONS
} from './constants';

export async function install(directory: string, version: string = DEFAULT_METAMASK_FLASK_VERSION): Promise<string> {
  const assetName = `${DEFAULT_METAMASK_FLASK_ASSET}-${version}-flask.0`;
  let destDir: string = `${directory}/${assetName}`;
  const exists = fileExists(destDir);
  if (exists) {
    logInfo(`MetaMask Flask version <v${version}> already exists in ${destDir}`);
    return destDir;
  }
  compareVersion(METAMASK_FLASK, version, RECOMMENDED_METAMASK_FLASK_VERSIONS);
  const release: any = await fetchGithubRelease(
    METAMASK_FLASK,
    version,
    METAMASK_GITHUB_API,
    METAMASK_FLASK_PACKAGE_NAME
  );
  const asset: Asset = findGithubAsset(assetName, release);
  createDirectory(directory);
  const fileName: string = await downloadAssetZipFile(asset, directory);
  destDir = extractZipContents(fileName);
  await enableMetaMaskAutomation(destDir);
  logSuccess(`Installed MetaMask Flask version <v${version}>\n${destDir}`);
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
