import astAnalyzer from "isotropy-ast-analyzer-db";
import transform from "./transform";
import * as babylon from "babylon";

function getAST(code) {
  const fn = `async function fn() { await ${code} }`;
  const ast = babylon.parse(fn);
  return ast.program.body[0].body.body[0].expression;
}

function editPath(path, analysis, state, config) {
  const transformed = transform(analysis, config);
  const ast = getAST(transformed);
  path.replaceWith(ast);
}

const transformers = {
  write: {
    transformAssignmentExpression: editPath
  },
  read: {
    transformCallExpression: editPath,
    transformMemberExpression: editPath
  }
}

const plugin = astAnalyzer(transformers, {});

export default plugin;
