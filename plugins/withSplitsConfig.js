const { withAppBuildGradle } = require("@expo/config-plugins");
const { replaceInConfig, trimNewLine } = require("./utils");

const withSplitsConfig = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language !== "groovy") {
      throw new Error("Cannot work with non-groovy build.gradle file");
    }
    // Step 1: Add "reactNativeArchitectures" function
    config.modResults.contents = addReactNativeArchitecturesFunction(
      config.modResults.contents,
    );
    // Step 2: Add "splits" block
    config.modResults.contents = addSplitsConfig(config.modResults.contents);

    return config;
  });
};

const architecturesFunctionReplace = trimNewLine(`
// =======================================================================
// Added by "withSplitsConfig" expo config plugin
// =======================================================================
def reactNativeArchitectures() {
  def value = findProperty('reactNativeArchitectures')
  return value ? value.split(",") : ["armeabi-v7a", "x86", "x86_64", "arm64-v8a"]
}`);

function addReactNativeArchitecturesFunction(buildGradle) {
  const functionRegex = /def reactNativeArchitectures\(\) {/;
  const androidBlockRegex = /android {/;
  const errorMessage = `Could not find "android" block in build.gradle`;
  const replaceString = `${architecturesFunctionReplace}\n\nandroid {`;

  return replaceInConfig({
    config: buildGradle,
    validationPattern: functionRegex,
    replacePattern: androidBlockRegex,
    replaceString,
    errorMessage,
  });
}

function addSplitsConfig(buildGradle) {
  const splitsReplace = trimNewLine(`
    // =================================================================
    // Added by "withSplitsConfig" expo config plugin
    // =================================================================
    // Configure splits to generate separate APKs for different architectures
    splits {
        abi {
            enable true
            reset()
            include (*reactNativeArchitectures())
            universalApk true
        }
    }`);
  const splitsBlockRegex = /splits {/;
  const androidBlockRegex = /android {/;

  const replaceString = `android {\n${splitsReplace}\n`;
  const errorMessage = "Could not find the android block in build.gradle";

  return replaceInConfig({
    config: buildGradle,
    validationPattern: splitsBlockRegex,
    replacePattern: androidBlockRegex,
    replaceString,
    errorMessage,
  });
}

module.exports = withSplitsConfig;
