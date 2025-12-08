/* eslint-disable */

const _path = require("path");
const { PAGES_PATH, EDITABLE_ELEMENTS } = require("./config.js");
const { _isEditableFile } = require("./utils.js");

const _getRelativePath = (filename, targetPath) => {
  return _path.relative(_path.dirname(filename), _path.join(__dirname, targetPath));
};

const _hasImport = (t, p, importPath) => {
  return p.node.body.some((node) => {
    return t.isImportDeclaration(node) && node.source.value === importPath;
  });
};

const _addImportStatement = (t, p, identifier, importPath) => {
  if (_hasImport(t, p, importPath)) return;

  const importDecl = t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(identifier))],
    t.stringLiteral(importPath)
  );
  p.unshiftContainer("body", importDecl);
};

const addEditableElementImport = (t, path, state) => {
  const filename = state.file.opts.filename || "";
  if (!_isEditableFile(filename)) return;

  const importPath = _getRelativePath(filename, "../EditableElement_");
  _addImportStatement(t, path, "EditableElement_", importPath);
};

const addEditableWrapperImport = (t, path, state) => {
  const filename = state.file.opts.filename || "";
  if (!_isEditableFile(filename)) return;

  const importPath = _getRelativePath(filename, "../withEditableWrapper_");
  _addImportStatement(t, path, "withEditableWrapper_", importPath);
};

const wrapElementsInEdit = (t, path) => {
  const opening = path.node.openingElement;
  if (!opening || opening.name.type !== "JSXIdentifier") return;

  const elementName = opening.name.name;
  if (!EDITABLE_ELEMENTS.includes(elementName)) return;

  // Prevent double-wrapping
  if (
    path.parentPath.isJSXElement() &&
    path.parentPath.node.openingElement.name?.name === "EditableElement_"
  ) {
    return;
  }

  const wrapped = t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier("EditableElement_"), [], false),
    t.jsxClosingElement(t.jsxIdentifier("EditableElement_")),
    [t.cloneNode(path.node, true)],
    false
  );

  path.replaceWith(t.cloneNode(wrapped, true));
};

const wrapExportWithEditableWrapper = (t, path) => {
  path.traverse({
    ExportDefaultDeclaration(exportPath) {
      const declaration = exportPath.node.declaration;

      if (t.isIdentifier(declaration)) {
        exportPath.replaceWith(
          t.exportDefaultDeclaration(
            t.callExpression(t.identifier("withEditableWrapper_"), [declaration])
          )
        );
      } else if (t.isFunctionDeclaration(declaration) && declaration.id) {
        exportPath.replaceWithMultiple([
          declaration,
          t.exportDefaultDeclaration(
            t.callExpression(t.identifier("withEditableWrapper_"), [
              declaration.id,
            ])
          ),
        ]);
      }
    },
  });
};

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path, state) {
        const filename = state.file.opts.filename || "";

        addEditableElementImport(t, path, state);

        if (filename.includes(PAGES_PATH) && filename.endsWith("_layout.tsx")) {
          addEditableWrapperImport(t, path, state);
          wrapExportWithEditableWrapper(t, path);
        }
      },

      JSXElement(path, state) {
        const filename = state.file.opts.filename || "";
        if (_isEditableFile(filename)) {
          wrapElementsInEdit(t, path);
        }
      },
    },
  };
};