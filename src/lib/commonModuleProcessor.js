import fs from 'fs'
import Path from 'path';
import globalModuleProcessor from './globalModuleProcessor';

const commonModuleProcessor = (projectDef, moduleDef) => {
  const directories = [
    ["src"],
    ["src", "actions"],
    ["src", "components"],
    ["src", "containers"],
    ["src", "reducers"],
    ["src", "store"],
    ["tests"]
  ];

  //Create directory structure
  fs.mkdirSync(moduleDef.root);
  for (let d of directories) {
    fs.mkdirSync(Path.join(moduleDef.root, ...d));
    fs.writeFileSync(Path.join(moduleDef.root, ...d, ".gitkeep"), '');
  }

  //Write out initial package.json (modified by global processor later)
  fs.writeFileSync(Path.join(moduleDef.root, "package.json"), JSON.stringify({
    name: moduleDef.name,
    description: moduleDef.name,
    main: "src/index.js",
    scripts: {
      test: "echo \"Error: no test specified\" && exit 1"
    },
    dependencies: moduleDef.dependencies,
    devDependencies: moduleDef.devDependencies
  }, null, 2));
};


const buildCommonModuleDefinition = (config) => {
  return {
    name: `${config.scope}/common`,
    root: Path.join(config.rootDirectory, "common"),
    processors: [
      commonModuleProcessor,
      globalModuleProcessor
    ],
    dependencies: {
      "react": "*",
      "redux": "*",
      "redux-thunk": "*",
      "immutable": "*",
      "reselect": "*"
    },
    links: []
  }
};


export default commonModuleProcessor;
export { buildCommonModuleDefinition };