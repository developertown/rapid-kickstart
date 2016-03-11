import fs from 'fs';
import Path from 'path';
import { execSync } from 'child_process';

import { buildCommonModuleDefinition } from './commonModuleProcessor';
import { buildWebModuleDefinition } from './webModuleProcessor';
import { buildMobileModuleDefinition } from './mobileModuleProcessor';


const moduleDefBuilders = {
  common: buildCommonModuleDefinition,
  web: buildWebModuleDefinition,
  mobile: buildMobileModuleDefinition
};

// Take in a user config (as gathered from the user) and build a project definition object
const buildProjectDefinition = (config) => {

  const projectDefinition = {
    name: config.baseName,
    version: config.version,
    root: config.rootDirectory,
    author: config.authorName,
    modules: []
  };

  config.moduleTypes.forEach(moduleType =>
    projectDefinition.modules.push(moduleDefBuilders[moduleType](config))
  );

  return projectDefinition;
};

const generateModules = (config, projectDef) => {

  //TODO: bail out if dir exists, or prompt to overwrite?
  fs.mkdirSync(projectDef.root);

  projectDef.modules.forEach((moduleDef) => {
    console.log(`Generating ${moduleDef.name}...`);

    moduleDef.processors.forEach((processor) => processor(projectDef, moduleDef));
  });

  if (config.useGit) {
    try {
      execSync('git init', {cwd: projectDef.root});
      execSync('git add -A', {cwd: projectDef.root});
      execSync('git commit -m "Initial import"', {cwd: projectDef.root});
    } catch (e) {
      console.log("\n\nError initializing git repository.");
      process.exit(1);
    }
  }

  if (config.useGitFlow) {
    try {
      execSync('git flow init -d', {cwd: projectDef.root});
    } catch (e) {
      console.log("\n\nError initializing git flow.");
      process.exit(1);
    }
  }
};

export { buildProjectDefinition, generateModules };

