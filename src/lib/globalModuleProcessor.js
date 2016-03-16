
import fs from 'fs'
import { execSync } from 'child_process';
import Path from 'path';
import _ from 'lodash';

//Update package.json with common attributes
const updatePackageJSON = (projectDef, moduleDef) => {
  let pkgJSONPath = Path.join(moduleDef.root, "package.json");
  let pkg = JSON.parse(fs.readFileSync(pkgJSONPath));

  //Assign project and module-level specifics
  pkg = Object.assign({}, pkg, {
    private: true,
    name: `${projectDef.scope}/${moduleDef.type}`,
    author: projectDef.author,
    license: "UNLICENSED",
    version: projectDef.version,
    description: projectDef.friendlyName
  });

  //Add any additional dependencies
  pkg.dependencies = {...pkg.dependencies, ...moduleDef.dependencies};
  pkg.devDependencies = {...pkg.devDependencies, ...moduleDef.devDependencies};

  if (_.includes(projectDef.moduleTypes, "common")) {
    moduleDef.dependencies[`${projectDef.scope}/common`] = "*";
    moduleDef.links.push(Path.join(projectDef.root, "common"));
  }

  fs.writeFileSync(pkgJSONPath, JSON.stringify(pkg, null, 2));
};

//Setup npm links to any referenced local modules
const udpateLinks = (moduleDef) => {
  for (let l of moduleDef.links) {
    console.log(`getting ready to execute: 'npm link ${l}' in '${moduleDef.root}'`);
    execSync(`npm link ${l}`, {cwd: moduleDef.root});
    console.log("done with npm link");
  }
};

//Setup a correct gitignore
const updateGitIgnore = (moduleDef) => {
  fs.writeFileSync(Path.join(moduleDef.root, ".gitignore"), `
.DS_Store
node_modules
npm-debug.log
dist
  `);
};

//Get everything installed, package versions locked in, etc.
const updateNPM = (moduleDef) => {
  execSync("npm update --save", {cwd: moduleDef.root});
  execSync("npm install", {cwd: moduleDef.root});
  execSync("npm shrinkwrap --dev", {cwd: moduleDef.root});
};



const processGlobalUpdates = (projectDef, moduleDef) => {
  updatePackageJSON(projectDef, moduleDef);
  udpateLinks(moduleDef);
  updateGitIgnore(moduleDef);
  updateNPM(moduleDef);
};

export default processGlobalUpdates;