
const fs = require('fs');
const readline = require('readline');
const Path = require('path');

const globalModuleProcessor = require('./lib/globalModuleProcessor');
const commonModuleProcessor = require('./lib/commonModuleProcessor');
const webModuleProcessor = require('./lib/webModuleProcessor');
const mobileModuleProcessor = require('./lib/mobileModuleProcessor');

const projectName = process.argv[2];
const scopePrefix = `@${projectName}`;
const commonModuleName = `${scopePrefix}/common`
const projectRootDirectory = Path.join(process.cwd(), projectName);
const author = "DeveloperTown LLC"; //TODO: factor out to a CLI argument...

const projectDef = {
  name: projectName,
  version: "0.0.1",
  root: projectRootDirectory,
  author,

  modules: [
    {
      name: `${scopePrefix}/common`,
      root: Path.join(projectRootDirectory, "common"),
      processors: [commonModuleProcessor],
      dependencies: {
        "react": "*",
        "redux": "*",
        "redux-thunk": "*",
        "immutable": "*",
        "reselect": "*"
      },
      links: []
    },
    {
      name: `${scopePrefix}/web`,
      root: Path.join(projectRootDirectory, "web"),
      processors: [webModuleProcessor],
      dependencies: {
        [commonModuleName]: "*",
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

        "material-ui": "*"
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
      links: [
        Path.join(projectRootDirectory, "common")
      ]
    },
    {
      name: `${scopePrefix}/mobile`,
      root: Path.join(projectRootDirectory, "mobile"),
      processors: [mobileModuleProcessor],
      dependencies: {
        [commonModuleName]: "*"
      },
      links: [
        Path.join(projectRootDirectory, "common")
      ]
    }
  ]
};

const print = (msg) => process.stdout.write(msg);
const println = (msg) => print(`${msg}\n`);


println("Generating root directory...");
fs.mkdirSync(projectDef.root);

projectDef.modules.forEach((moduleDef) => {
  println(`Generating ${moduleDef.name}...`);

  moduleDef.processors.forEach((processor) => processor(projectDef, moduleDef));
  globalModuleProcessor(projectDef, moduleDef);
});
