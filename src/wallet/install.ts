import fs from 'fs';
import path from 'path';
import axios from 'axios';
import AdmZip from 'adm-zip';
import semver, { Range } from 'semver';
import { PACKAGE_NAME } from '../constants';
import { Asset, Wallet } from '../types';

export function compareVersion(wallet: Wallet, version: string, recommendedVersions: Range): void {
  const satisfy = semver.satisfies(version, recommendedVersions);
  if (!satisfy) {
    throw new Error(
      `This version (${version}) of ${wallet} is not supported. Please try version(s): ${recommendedVersions}.`,
    );
  }
}

export function createDirectory(directory: string): void {
  if (fs.existsSync(directory) === false) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

export async function downloadZipFile(asset: Asset, directory: string): Promise<string> {
  const zipFileName = path.join(directory, asset.name);
  const zipFile = await axios.get(asset.browser_download_url, {
    responseType: 'arraybuffer',
  });
  fs.writeFileSync(zipFileName, zipFile.data);
  return zipFileName;
}

export function extractZipContents(from: string): string {
  const to = from.substring(0, from.length - 4);
  const zip = new AdmZip(from);
  zip.extractAllTo(to, true);
  return to;
}

export async function fetchGithubRelease(wallet: Wallet, version: string, releasesUrl: string): Promise<any> {
  const response = await axios.get(releasesUrl);
  const releases = response.data;
  const release = releases.find((item: any) => item.tag_name === `v${version}`);
  if (!release) {
    throw new Error(`Could not find version (${version}) of ${wallet}, try updating the '${PACKAGE_NAME}' package.`);
  }
  return release;
}

export function findDownloadURL(assetName: string, release: any, version: string): Asset {
  switch (assetName) {
    case 'metamask-chrome':
      assetName = `${assetName}-${version}.zip`;
      break;
    case 'metamask-flask-chrome':
      assetName = `${assetName}-${version}-flask.0.zip`;
      break;
    case 'zerion-wallet-extension':
      assetName = `${assetName}-v${version}.zip`;
      break;
    default:
      throw Error(`Could not find the specified release asset (${assetName}).`);
  }
  const asset: Asset = release.assets.find((item: any) => item.name === assetName);
  return asset;
}

export function moveFiles(destDir: string): void {
  const destDirs: string[] = destDir.split(path.sep);
  const lastDirName = destDirs.pop();
  const srcDir: string = path.join(destDir, lastDirName);
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcFilePath = path.join(srcDir, file);
    const destFilePath = path.join(destDir, file);
    fs.renameSync(srcFilePath, destFilePath);
  }
  fs.rmdirSync(srcDir);
}
