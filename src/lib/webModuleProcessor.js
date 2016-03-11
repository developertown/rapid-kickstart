import fs from 'fs';
import Path from 'path';
import _ from 'lodash';

import globalModuleProcessor from './globalModuleProcessor';

const webModuleProcessor = (projectDef, moduleDef) => {
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


const buildWebModuleDefinition = (config) => {
  const moduleDef = {
    name: `${config.scope}/web`,
    root: Path.join(config.rootDirectory, "web"),
    processors: [
      webModuleProcessor,
      globalModuleProcessor
    ],
    dependencies: {
      "react": "*",
      "react-dom": "*",
      "react-router": "*",
      "react-tap-event-plugin": "*",

      "redux": "*",
      "redux-logger": "*",
      "redux-thunk": "*",
      "redux-form": "*",
      "react-redux": "*",
      "react-router-redux": "*",

      "immutable": "*",
      "reselect": "*",

      "firebase": "*",
      "lodash": "*",
      "whatwg-fetch": "*",

      "material-ui": "*",

      "rapid-firebase-authentication": "*"
    },
    devDependencies: {
      "babel-core": "*",
      "babel-loader": "*",
      "babel-preset-es2015": "*",
      "babel-preset-react": "*",
      "babel-plugin-lodash": "*",
      "exports-loader": "*",        //e.g., injecting fetch polyfill
      "imports-loader": "*",
      "expose-loader": "*",         //e.g., expose exports as global, e.g., for React devtools

      "webpack": "*",

      //hot reloading and dev browser experience support:
      "babel-plugin-react-transform": "*",
      "babel-preset-react-hmre": "*",
      "eventsource-polyfill": "*",
      "express": "*",
      "react-transform-catch-errors": "*",
      "react-transform-hmr": "*",
      "redbox-react": "*",
      "webpack-dev-middleware": "*",
      "webpack-hot-middleware": "*",
      "react-render-visualizer": "*"
    },
    links: []
  };


  if (_.includes(config.moduleTypes, "common")) {
    moduleDef.dependencies[`${config.scope}/common`] = "*";
    moduleDef.links.push(Path.join(config.rootDirectory, "common"));
  }

  return moduleDef;
};


export default webModuleProcessor;
export { buildWebModuleDefinition };