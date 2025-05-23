import { DEFAULT_RAINBOW_VERSION, RAINBOW, RAINBOW_GITHUB_API, RECOMMENDED_RAINBOW_VERSIONS } from '../constants';
import { logError, logInfo, logSuccess } from '../log';
import { Artifact } from '../types';
import {
  checkEnvVariable,
  compareVersion,
  createDirectory,
  downloadArtifactZipFile,
  extractZipContents,
  fetchGithubTags,
  fetchGithubWorkflow,
  fetchGithubRun,
  fetchGithubArtifact,
  fileExists
} from '../wallet/install';

export async function install(directory: string, version: string = DEFAULT_RAINBOW_VERSION): Promise<void> {
  try {
    const artifactName = `rainbowbx-chrome-v${version}`;
    const exists = fileExists(directory, artifactName);
    if (exists) {
      logInfo(`Rainbow version <v${version}> already exists in ${directory}/${artifactName}`);
      return;
    }
    const workflowName = 'Publish to Chrome (Prod)';
    checkEnvVariable('GITHUB_TOKEN');
    compareVersion(RAINBOW, version, RECOMMENDED_RAINBOW_VERSIONS);
    await fetchGithubTags(RAINBOW, version, RAINBOW_GITHUB_API);
    const workflow = await fetchGithubWorkflow(workflowName, RAINBOW_GITHUB_API);
    const run = await fetchGithubRun(version, workflowName, workflow, RAINBOW_GITHUB_API);
    const artifact: Artifact = await fetchGithubArtifact(artifactName, run, RAINBOW_GITHUB_API);
    createDirectory(directory);
    const fileName: string = await downloadArtifactZipFile(artifact, directory);
    const destDir: string = extractZipContents(fileName);
    logSuccess(`Installed Rainbow version <v${version}>\n${destDir}`);
  } catch (error: any) {
    logError(error.message);
  }
}
