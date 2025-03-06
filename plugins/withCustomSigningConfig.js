const { withAppBuildGradle } = require("@expo/config-plugins");
const { replaceInConfig, trimNewLine } = require("./utils");

function withCustomSigningConfig(config) {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language !== "groovy") {
      throw new Error("Cannot work with non-groovy build.gradle file");
    }
    // Step 1: Add "release" signing config
    config.modResults.contents = addReleaseSigningConfig(
      config.modResults.contents,
    );
    // Step 2: Replace signing config for "release" build type
    config.modResults.contents = changeReleaseBuildTypeSigningConfig(
      config.modResults.contents,
    );

    return config;
  });
}

const releaseSigningReplace = trimNewLine(`
        // =======================================================================
        // Added by "withCustomSigningConfig" expo config plugin
        // =======================================================================
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
            enableV3Signing true
        }`);

function addReleaseSigningConfig(buildGradle) {
  const signingConfigsBlockRegex = /signingConfigs\s*{/;
  const releaseBlockRegex =
    /release {\s*if \(project.hasProperty\('MYAPP_UPLOAD_STORE_FILE'\)\) {/;
  const replaceString = `signingConfigs {\n${releaseSigningReplace}\n`;
  const errorMessage = 'Could not find the "signingConfigs" block';

  return replaceInConfig({
    config: buildGradle,
    validationPattern: releaseBlockRegex,
    replacePattern: signingConfigsBlockRegex,
    replaceString,
    errorMessage,
  });
}

/**
 * Replace "signingConfig signingConfigs.debug" with
 * "signingConfig signingConfigs.release" for "release" block inside
 * buildTypes.
 *
 * Throw an error if there are neither debug nor release signing config
 */
function changeReleaseBuildTypeSigningConfig(buildGradle) {
  const releaseSigningRegex =
    /release\s*{[^}]*signingConfig\s+signingConfigs\.release/;
  const debugSigningRegex =
    /(release\s*{[^}]*signingConfig\s+signingConfigs)\.debug/;

  const comment = '// Changed by "withCustomSigningConfig" expo config plugin';
  const replaceString = `$1.release ${comment}`;

  const errorMessage =
    'Missing "signingConfig.(debug|release)" in "release" block under "buildTypes".';

  return replaceInConfig({
    config: buildGradle,
    validationPattern: releaseSigningRegex,
    replacePattern: debugSigningRegex,
    replaceString,
    errorMessage,
  });
}

module.exports = withCustomSigningConfig;
