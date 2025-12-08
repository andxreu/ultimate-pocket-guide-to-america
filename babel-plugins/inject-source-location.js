/* eslint-disable */

const { _isEditableFile } = require("./utils.js");

module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        const filename = state.file.opts.filename || "unknown";
        const loc = path.node.loc;

        if (!loc) return;
        if (!_isEditableFile(filename)) return;

        const line = loc.start.line;
        const column = loc.start.column;
        const sourceLocation = `${filename}:${line}:${column}`;

        const openingName = path.node.name;
        if (!openingName || openingName.type !== "JSXIdentifier") return;

        // Inject __sourceLocation
        path.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("__sourceLocation"),
            t.stringLiteral(sourceLocation)
          )
        );

        // Inject __trace — builds a path from root to this element
        path.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("__trace"),
            t.jsxExpressionContainer(
              t.arrayExpression([
                // Spread parent trace if exists
                t.spreadElement(
                  t.logicalExpression(
                    "||",
                    t.memberExpression(
                      t.logicalExpression(
                        "||",
                        t.memberExpression(t.identifier("arguments"), t.numericLiteral(0), true), // props
                        t.arrayExpression([])
                      ),
                      t.identifier("__trace")
                    ),
                    t.arrayExpression([])
                  )
                ),
                // Current location
                t.stringLiteral(sourceLocation),
              ])
            )
          )
        );
      },
    },
  };
};