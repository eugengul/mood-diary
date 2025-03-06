function trimNewLine(str) {
  return str.replace(/^\n+|\n+$/g, "");
}

/**
 * Updates the configuration string based on given regex patterns.
 *
 * @param {Object} params - Named parameters.
 * @param {string} params.config - The configuration string.
 * @param {string} params.validationPattern - Regex pattern to check if
 *    the configuration is already in the desired state.
 * @param {string} params.replacePattern - Regex pattern to identify the
 *  part of the configuration to replace.
 * @param {string} params.replacement - The string to replace the search
 *  pattern with.
 * @returns {string} - The original or updated config string.
 * @throws {Error} - If neither the check pattern nor search pattern is
 *   found.
 */
function replaceInConfig({
  config,
  validationPattern,
  replacePattern,
  replaceString,
  errorMessage,
}) {
  // If config already matched, return it as is
  if (validationPattern.test(config)) {
    return config;
  }

  // If replacement can't be done throw an error
  if (!replacePattern.test(config)) {
    throw new Error(errorMessage);
  }

  // Replace and return changed config
  return config.replace(replacePattern, replaceString);
}

module.exports = { trimNewLine, replaceInConfig };
