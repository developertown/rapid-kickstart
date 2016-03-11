import inquirer from 'inquirer';
import packageJSON from 'json!../package';
import Path from 'path';
import semver from 'semver';

import * as util from './lib/util';

console.log(`\n\tPrototype Kickstart v${packageJSON.version}\n\n`);


let config = {
  authorName: "DeveloperTown, LLC",
  version: "0.0.1"
};


const gatherConfig = () => {
  inquirer.prompt([
    {
      name: "appName",
      message: "Prototype name:",
      default: config.appName,
      validate: (input) => input.trim().length > 0,
      filter: (input) => input.trim()
    },
    {
      name: "version",
      message: "Version:",
      default: config.version,
      validate: (input) =>
        (semver.valid(input.trim()) != null) || "Please use a valid semver identifier (http://semver.org/)",
      filter: (input) => input.trim()
    },
    {
      name: "authorName",
      message: "Company or client:",
      default: config.authorName,
      validate: (input) => input.trim().length > 0,
      filter: (input) => input.trim()
    },
    {
      name: "moduleTypes",
      type: "checkbox",
      message: "Platforms (choose at least one):",
      choices: ["web", "mobile"],
      default: config.moduleTypes || ["web"],
      validate: (input) => input.length > 0,
      filter: (input) => input.length > 1 ? ["common", ...input] : input
    },
    {
      name: "useGit",
      type: "confirm",
      message: "Initialize git for the new repository?",
      default: true
    },
    {
      name: "useGitFlow",
      type: "confirm",
      message: "Initialize git flow for the new repository?",
      default: true,
      when: (answers) => answers.useGit
    }

  ], (_cfg) => {

    //post-process gathered config
    const whitespaceRegex = /\s/g;
    let sanitizedAppName = _cfg.appName.toLowerCase().replace(whitespaceRegex, '_');

    config = {
      ..._cfg,
      baseName: sanitizedAppName,
      scope: "@" + sanitizedAppName,
      rootDirectory: Path.join(process.cwd(), sanitizedAppName)
    };


    //confirm config with user
    console.log(config);
    inquirer.prompt([{
      name: "confirmed",
      type: "confirm",
      message: "Does this configuration look correct?",
      default: true
    }], (x) => {
      if (!x.confirmed) {
        //again!
        gatherConfig();
      } else {

        const projectDefinition = util.buildProjectDefinition(config);
        util.generateModules(config, projectDefinition);
      }
    });



  });
};

gatherConfig();



//var loader = [
//  "/ Installing",
//  "| Installing",
//  "\\ Installing",
//  "- Installing"
//];
//var i = 4;
//var ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % 4] });
//
//setInterval(function() {
//  ui.updateBottomBar( loader[i++ % 4] );
//}, 300 );

