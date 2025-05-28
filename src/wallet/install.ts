import AdmZip from 'adm-zip';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import semver, { Range } from 'semver';
import { PACKAGE_NAME } from '../constants';
import { Artifact, Asset, Wallet } from '../types';

export function checkEnvVariable(variable: string): void {
  const envVariable = process.env[variable];
  if (!envVariable) {
    throw new Error(
      `The environment variable ${variable} is not set. Please set it to your personal access token.\r\nYou can set it in your profile (e.g., ~/.bash_profile, ~/.zshrc): export ${variable}=your_personal_access_token`
    );
  }
}

export function compareVersion(wallet: Wallet, version: string, recommendedVersions: Range): void {
  const satisfy = semver.satisfies(version, recommendedVersions);
  if (!satisfy) {
    throw new Error(
      `This version (${version}) of ${wallet} is not supported. Please try version(s): ${recommendedVersions}.`
    );
  }
}

export function createDirectory(directory: string): void {
  if (fs.existsSync(directory) === false) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

export async function downloadAssetZipFile(asset: Asset, directory: string): Promise<string> {
  const file = asset.name.endsWith('.zip') ? asset.name : `${asset.name}.zip`;
  const zipFileName = path.join(directory, file);
  const zipFile = await axios.get(asset.browser_download_url, {
    responseType: 'arraybuffer'
  });
  fs.writeFileSync(zipFileName, zipFile.data);
  return zipFileName;
}

export async function downloadArtifactZipFile(artifact: Artifact, directory: string): Promise<string> {
  const file = artifact.name.endsWith('.zip') ? artifact.name : `${artifact.name}.zip`;
  const zipFileName = path.join(directory, file);
  const zipFile = await axios.get(artifact.archive_download_url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    },
    responseType: 'arraybuffer'
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

export async function fetchGithubArtifact(artifactName: string, run: any, githubApiUrl: string): Promise<Artifact> {
  const artifactsResponse = await axios.get(`${githubApiUrl}/actions/runs/${run.id}/artifacts`);
  const artifacts = artifactsResponse.data.artifacts;
  const artifact: Artifact = artifacts.find((item: any) => item.name === artifactName);
  if (!artifact) {
    throw new Error(`Artifact with name ${artifactName} not found.`);
  }
  return artifact;
}

export async function fetchGithubRelease(wallet: Wallet, version: string, githubApiUrl: string): Promise<any> {
  const releasesUrl = `${githubApiUrl}/releases`;
  const response = await axios.get(releasesUrl);
  const releases = response.data;
  const release = releases.find((item: any) => item.tag_name === `v${version}`);
  if (!release) {
    throw new Error(`Could not find version (${version}) of ${wallet}, try updating the '${PACKAGE_NAME}' package.`);
  }
  return release;
}

export async function fetchGithubRun(
  version: string,
  workflowName: string,
  workflow: any,
  githubApiUrl: string
): Promise<any> {
  const runBranch = `rc-v${version}`;
  const runsResponse = await axios.get(`${githubApiUrl}/actions/workflows/${workflow.id}/runs`);
  const runs = runsResponse.data.workflow_runs;
  const run = runs.find((item: any) => item.head_branch === runBranch);
  if (!run) {
    throw new Error(`No runs found for workflow ${workflowName} with branch ${runBranch}.`);
  }
  return run;
}

export async function fetchGithubTags(wallet: Wallet, version: string, githubApiUrl: string): Promise<void> {
  const tagsUrl = `${githubApiUrl}/tags`;
  const response = await axios.get(tagsUrl);
  const tags = response.data;
  const tag = tags.find((item: any) => item.name === `v${version}`);
  if (!tag) {
    throw new Error(`Could not find version (${version}) of ${wallet}, try updating the '${PACKAGE_NAME}' package.`);
  }
}

export async function fetchGithubWorkflow(workflowName: string, githubApiUrl: string): Promise<any> {
  const workflowsResponse = await axios.get(`${githubApiUrl}/actions/workflows`);
  const workflows = workflowsResponse.data.workflows;
  const workflow = workflows.find((item: any) => item.name === workflowName);
  if (!workflow) {
    throw new Error(`Workflow with name ${workflowName} not found.`);
  }
  return workflow;
}

export function fileExists(path: string): boolean {
  return fs.existsSync(path);
}

export function findGithubAsset(assetName: string, release: any): Asset {
  const file = assetName.endsWith('.zip') ? assetName : `${assetName}.zip`;
  const asset: Asset = release.assets.find((item: any) => item.name === file);
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
