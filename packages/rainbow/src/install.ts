import {
  Artifact,
  checkEnvVariable,
  compareVersion,
  createDirectory,
  downloadArtifactZipFile,
  extractZipContents,
  fetchGithubArtifact,
  fetchGithubRun,
  fetchGithubTags,
  fetchGithubWorkflow,
  fileExists,
  logInfo,
  logSuccess
} from '@assert-equals/dappdriver';
import {
  DEFAULT_RAINBOW_VERSION,
  RAINBOW,
  RAINBOW_GITHUB_API,
  RAINBOW_PACKAGE_NAME,
  RECOMMENDED_RAINBOW_VERSIONS
} from './constants';

export async function install(directory: string, version: string = DEFAULT_RAINBOW_VERSION): Promise<string> {
  const artifactName = `rainbowbx-chrome-v${version}`;
  let destDir: string = `${directory}/${artifactName}`;
  const exists = fileExists(destDir);
  if (exists) {
    logInfo(`Rainbow version <v${version}> already exists in ${destDir}`);
    return destDir;
  }
  const workflowName = 'Publish to Chrome (Prod)';
  checkEnvVariable('GITHUB_TOKEN');
  compareVersion(RAINBOW, version, RECOMMENDED_RAINBOW_VERSIONS);
  await fetchGithubTags(RAINBOW, version, RAINBOW_GITHUB_API, RAINBOW_PACKAGE_NAME);
  const workflow = await fetchGithubWorkflow(workflowName, RAINBOW_GITHUB_API);
  const run = await fetchGithubRun(version, workflowName, workflow, RAINBOW_GITHUB_API);
  const artifact: Artifact = await fetchGithubArtifact(artifactName, run, RAINBOW_GITHUB_API);
  createDirectory(directory);
  const fileName: string = await downloadArtifactZipFile(artifact, directory);
  destDir = extractZipContents(fileName);
  logSuccess(`Installed Rainbow version <v${version}>\n${destDir}`);
  return destDir;
}
