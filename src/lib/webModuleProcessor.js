import fs from 'fs-extra';
import Path from 'path';
import _ from 'lodash';

import globalModuleProcessor from './globalModuleProcessor';

const webModuleProcessor = (projectDef, moduleDef) => {

  //copy static resources into the new module root
  fs.copySync(Path.join(DISTDIR, "web"), moduleDef.root);

  //Write out initial package.json (modified by global processor later)
  fs.writeFileSync(Path.join(moduleDef.root, "package.json"), JSON.stringify({
    name: moduleDef.name,
    description: moduleDef.name,
    main: "src/index.js",
    scripts: {
      test: "jest",
      start: "node server-dev"
    },
    dependencies: moduleDef.dependencies,
    devDependencies: moduleDef.devDependencies,
    babel: {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ]
    },
    jest: {
      unmockedModulePathPatterns: [
        "<rootDir>/node_modules/react",
        "<rootDir>/node_modules/react-dom",
        "<rootDir>/node_modules/react-addons-test-utils"
      ],
      moduleFileExtensions: [
        "js",
        "json",
        "jsx"
      ]
    }
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
      "redux-promise": "*",
      "redux-thunk": "*",
      "redux-form": "*",
      "react-redux": "*",
      "react-router-redux": "*",

      "immutable": "*",
      "reselect": "*",

      "firebase": "*",
      "lodash": "*",
      "whatwg-fetch": "*",


    },
    devDependencies: {
      "react-toolbox": "*",
      "normalize.css": "*",
      "react-addons-css-transition-group": "*",

      "rapid-firebase-authentication": "*",
      "autoprefixer": "*",
      "babel-core": "*",
      "babel-jest": "*",
      "babel-loader": "*",
      "babel-preset-es2015": "*",
      "babel-preset-react": "*",
      "babel-preset-stage-0": "*",
      "babel-plugin-lodash": "*",
      "css-loader": "*",
      "exports-loader": "*",        //e.g., injecting fetch polyfill
      "imports-loader": "*",
      "jest-cli": "*",
      "postcss-loader": "*",
      "sass-loader": "*",
      "node-sass": "=3.4.2",
      "style-loader": "*",
      "toolbox-loader": "*",
      "normalize.css": "*",
      "react-addons-css-transition-group": "*",
      "extract-text-webpack-plugin": "*",
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