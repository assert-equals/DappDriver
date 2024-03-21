import fs from 'fs';
import path from 'path';
import axios from 'axios';
import AdmZip from 'adm-zip';
import semver from 'semver';
import { PACKAGE_NAME, RECOMMENDED_VERSIONS } from '../constants';
import { Asset } from '../types';

function compareVersion(version: string): void {
  const satisfy = semver.satisfies(version, RECOMMENDED_VERSIONS);
  if (!satisfy) {
    throw new Error(
      `This version (${version}) of MetaMask is not supported. Please try version(s): ${RECOMMENDED_VERSIONS}`,
    );
  }
}

function createDirectory(directory: string): void {
  if (fs.existsSync(directory) === false) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

async function downloadZipFile(asset: Asset, directory: string): Promise<string> {
  const zipFileName = path.join(directory, asset.name);
  const zipFile = await axios.get(asset.browser_download_url, {
    responseType: 'arraybuffer',
  });
  fs.writeFileSync(zipFileName, zipFile.data);
  return zipFileName;
}

function extractZipContents(from: string): void {
  const to = from.substring(0, from.length - 4);
  const zip = new AdmZip(from);
  zip.extractAllTo(to, true);
}

async function fetchGithubRelease(version: string): Promise<any> {
  const releasesUrl = 'https://api.github.com/repos/metamask/metamask-extension/releases';
  const response = await axios.get(releasesUrl);
  const releases = response.data;
  const release = releases.find((r: any) => r.tag_name === `v${version}`);
  if (!release) {
    throw new Error(`Could not find the specified version or MetaMask, try updating the '${PACKAGE_NAME}' package.`);
  }
  return release;
}

function findDownloadURL(channel: string, release: any): Asset {
  let asset: Asset;
  switch (channel) {
    case 'metamask-chrome':
      asset = release.assets.find((a: any) => a.name.startsWith('metamask-chrome'));
      break;
    case 'metamask-flask-chrome':
      asset = release.assets.find((a: any) => a.name.startsWith('metamask-flask-chrome'));
      break;
    default:
      throw Error('Could not find the specified release channel.');
  }
  return asset;
}

export async function installMetaMaskWallet(version: string, channel: string, directory: string): Promise<void> {
  try {
    compareVersion(version);
    const release: any = await fetchGithubRelease(version);
    const asset: Asset = findDownloadURL(channel, release);
    createDirectory(directory);
    const fileName: string = await downloadZipFile(asset, directory);
    extractZipContents(fileName);
  } catch (error: any) {
    console.error('[ERROR]:', error.message);
  }
}
