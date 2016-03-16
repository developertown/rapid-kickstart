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
};


const buildMobileModuleDefinition = (config) => {

  const moduleDef = {
    name: `${config.scope}/mobile`,
    type: 'mobile',
    root: Path.join(config.rootDirectory, "mobile"),
    processors: [
      mobileModuleProcessor,
      globalModuleProcessor
    ],
    dependencies: {},
    devDependencies: {},
    links: []
  };

  return moduleDef;
};


export default mobileModuleProcessor;
export { buildMobileModuleDefinition };