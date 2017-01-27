import astAnalyzer from "isotropy-ast-analyzer-db";
import transform from "./transform";

function editPath(path, analysis, state, config) {
  path.replaceWithSourceString(transform(analysis, config));
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
