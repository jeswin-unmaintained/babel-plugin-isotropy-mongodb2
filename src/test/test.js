import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import sourceMapSupport from 'source-map-support';

import plugin from "../babel-plugin-isotropy-mongodb";

sourceMapSupport.install();

describe("babel-plugin-isotropy-mongodb", () => {
  function run([description, dir, opts]) {
    it(`${description}`, () => {
      const fixturePath = path.resolve(__dirname, 'fixtures', dir, `fixture.js`);
      const expectedPath = path.resolve(__dirname, 'fixtures', dir, `expected.js`);
      const expected = fs.readFileSync(expectedPath).toString().replace(/\n*$/, "");

      const actual = babel.transformFileSync(fixturePath, {
        plugins: [
          [
            plugin, (!opts || !opts.import) ?
              { identifiers: ["db"] } :
              { clientPackageName: "isotropy-mongodb-client", serverPackageName: "isotropy-mongodb-server"}
          ],
          "transform-object-rest-spread"
        ],
        babelrc: false,
      });

      //console.log(actual.code);
      actual.code.should.equal(expected);
    });
  }

  const tests = [
    ['count', 'count'],
    // ['delete', 'delete'],
    // ['insert', 'insert'],
    //['select', 'select'],
    // ['select-all', 'select-all'],
    // ['select-fields', 'select-fields'],
    // ['select-slice', 'select-slice'],
    // ['select-sort', 'select-sort'],
    // ['update', 'update'],
    // ['import-select', 'import-select', { import: true }],
    // ['import-update', 'import-update', { simple: false }],
  ];

  for (const test of tests) {
    run(test);
  }


});
