import fs from 'fs'
import { execSync } from 'child_process';
import Path from 'path';
import _ from 'lodash';

import globalModuleProcessor from './globalModuleProcessor';

const generator = 'react-native init mobile';

const mobileModuleProcessor = (projectDef, moduleDef) => {
  try {
    execSync(generator, {cwd: projectDef.root});
  } catch (e) {
    console.log("\n\nError executing react-native project generator.  Did you install it with: `npm install react-native-cli`?");
    process.exit(1);
  }

  let pkgJSONPath = Path.join(moduleDef.root, "package.json");
  let pkg = JSON.parse(fs.readFileSync(pkgJSONPath));

  pkg = Object.assign(pkg, {
    name: moduleDef.name,
    description: moduleDef.name,
    dependencies: Object.assign(
        {},
        pkg.dependencies,
        moduleDef.dependencies
    ),
    devDependencies: Object.assign(
        {},
        pkg.devDependencies,
        moduleDef.devDependencies
    )
  });

  fs.writeFileSync(pkgJSONPath, JSON.stringify(pkg, null, 2));

};


const buildMobileModuleDefinition = (config) => {

  const moduleDef = {
    name: `${config.scope}/mobile`,
    root: Path.join(config.rootDirectory, "mobile"),
    processors: [
      mobileModuleProcessor,
      globalModuleProcessor
    ],
    dependencies: {},
    links: []
  };

  if (_.includes(config.moduleTypes, "common")) {
    moduleDef.dependencies[`${config.scope}/common`] = "*";
    moduleDef.links.push(Path.join(config.rootDirectory, "common"));
  }

  return moduleDef;
};


export default mobileModuleProcessor;
export { buildMobileModuleDefinition };