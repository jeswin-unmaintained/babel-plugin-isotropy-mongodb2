import template from "babel-template";
import * as t from "babel-types";
import generate from "babel-generator";
import util from "util";

const query = template(`
  async function _() {
    const __iso_db = await getDb();
    const __iso_collection = await __iso_db.collection(COLLECTION_NAME);
    const __iso_cursor = __iso_collection.find();
  }`
);

export default function () {
  return {
    visitor: {
      Identifier(path, state) {
        if (path.node.name === "db") {
          console.log(util.inspect(path.node, { depth: 4 }));
          console.log(">>>>", util.inspect(path.parent.node, { depth: 4 }));
          //The MemberExpression immediately above contains the table.
          //const tableName = path.

          //Move up until the parent isn't a MemberExpression or a CallExpression


          // const ast = query({
          //   COLLECTION_NAME: t.stringLiteral(path.node.name)
          // });
          //
          //
          //
          //
          // //console.log(ast.body.body[1].declarations);
          // //console.log(util.inspect(path.findParent(p => !p.isMemberExpression() && !p.isCallExpression()).node, { depth: 6 }));
          // //console.log(util.inspect(path.getStatementParent().node, { depth: 6 }));
          // path.getStatementParent().replaceWithMultiple(ast.body.body);
        }
      }
    }
  };
}
