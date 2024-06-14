import { DEFAULT_RAINBOW_VERSION, RAINBOW, RAINBOW_GITHUB_API, RECOMMENDED_RAINBOW_VERSIONS } from '../constants';
import { logError, logSuccess } from '../log';
import { Artifact } from '../types';
import {
  checkEnvVariable,
  compareVersion,
  createDirectory,
  downloadArtifactZipFile,
  extractZipContents,
  fetchGithubRelease,
  fetchGithubWorkflow,
  fetchGithubRun,
  fetchGithubArtifact,
} from '../wallet/install';

export async function rainbow(directory: string, version: string = DEFAULT_RAINBOW_VERSION): Promise<void> {
  try {
    const workflowName = 'Publish to Chrome WebStore (Production)';
    checkEnvVariable('GITHUB_TOKEN');
    compareVersion(RAINBOW, version, RECOMMENDED_RAINBOW_VERSIONS);
    await fetchGithubRelease(RAINBOW, version, RAINBOW_GITHUB_API);
    const workflow = await fetchGithubWorkflow(workflowName, RAINBOW_GITHUB_API);
    const run = await fetchGithubRun(version, workflowName, workflow, RAINBOW_GITHUB_API);
    const artifact: Artifact = await fetchGithubArtifact(version, run, RAINBOW_GITHUB_API);
    createDirectory(directory);
    const fileName: string = await downloadArtifactZipFile(artifact, directory);
    extractZipContents(fileName);
    logSuccess('Installed Rainbow.');
  } catch (error: any) {
    logError(error.message);
  }
}
