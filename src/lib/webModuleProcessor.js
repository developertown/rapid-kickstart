import fs from 'fs-extra';
import Path from 'path';

import globalModuleProcessor from './globalModuleProcessor';

const webModuleProcessor = (projectDef, moduleDef) => {

  //copy static resources into the new module root
  fs.copySync(Path.join(DISTDIR, "web"), moduleDef.root);

};


const buildWebModuleDefinition = (config) => {
  const moduleDef = {
    name: `${config.scope}/web`,
    type: 'web',
    root: Path.join(config.rootDirectory, "web"),
    processors: [
      webModuleProcessor,
      globalModuleProcessor
    ],
    dependencies: {},
    devDependencies: {},
    links: []
  };

  return moduleDef;
};


export default webModuleProcessor;
export { buildWebModuleDefinition };