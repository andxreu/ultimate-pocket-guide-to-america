/* eslint-disable */

const { EDITABLE_PATHS, OMITTED_PATHS } = require("./config.js");

/**
 * Determines if a file should be processed by the editable-element Babel plugins.
 * Only files in /app/ and /components/ are editable.
 * node_modules and any paths in OMITTED_PATHS are excluded.
 */
const _isEditableFile = (filePath) => {
  if (typeof filePath !== "string") return false;

  return (
    EDITABLE_PATHS.some((editablePath) => filePath.includes(editablePath)) &&
    !OMITTED_PATHS.some((omittedPath) => filePath.includes(omittedPath))
  );
};

module.exports = {
  _isEditableFile,
};