"use strict";

const inquirer = require('inquirer');
const fs = require('fs-promise');
const whiskers = require('whiskers');

console.log(`\n\tPrototype Page Generator\n\n`);

let config = {
  requiresAuthentication: true
};

const DEFAULT_PAGE_NAME = "Meerkats Are Us";



const componentizeName = (friendly) => {
  //split the string into individual words and upcase each word
  const safeCharsRegex = /[^a-zA-Z0-9_\-]/g;
  const sanitized = friendly.replace(safeCharsRegex, '');
  const words = sanitized.split(/\s/).map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`);
  return words.join("");
}

const buildComponent = (config) => {
  const templateRoot = `src/containers/${config.componentName}`;

  fs.ensureDir(templateRoot).then(() =>
          Promise.all([
            fs.readFile(`${__dirname}/tmpl/component.jsx.tmpl`, "utf-8"),
            fs.readFile(`${__dirname}/tmpl/styles.scss.tmpl`, "utf-8")
          ])
      )
      .then((componentTemplate, stylesTemplate) =>
          Promise.all([
            fs.writeFile(`${templateRoot}/index.jsx`, whiskers.render(componentTemplate, config)),
            fs.writeFile(`${templateRoot}/styles.scss`, whiskers.render(stylesTemplate, config))
          ])
      );
};

const postInstructions = (config) => {

  const componentName = config.requiresAuthentication
      ? `requireAuthentication(${config.componentName})`
      : config.componentName;

  console.log(`

    Steps to finish:

    1. Insert the new component into your routes. e.g., :
          <Route path="${config.componentName.toLowerCase()}" component="${componentName}"/>

    2. Add the page to the site (navigation) if desired in src/components/header/navigation/index.jsx


  `);
};


const gatherConfig = () => {
  inquirer.prompt([
    {
      name: "pageName",
      message: "Page Name (Friendly):",
      default: config.pageName || DEFAULT_PAGE_NAME,
      validate: (input) => input !== DEFAULT_PAGE_NAME
    },
    {
      name: "componentName",
      message: "Component Name:",
      default: (answers) => config.componentName || componentizeName(answers.pageName)
    },
    {
      name: "requiresAuthentication",
      message: "Does this page require authentication?",
      type: "confirm",
      default: config.requiresAuthentication
    }
  ], (_cfg) => {

    //confirm config with user
    Object.assign(config, _cfg);
    console.log(config);

    inquirer.prompt([{
      name: "confirmed",
      type: "confirm",
      message: "Does this look correct?",
      default: true
    }], (x) => {
      if (!x.confirmed) {
        //again!
        gatherConfig();
      } else {
        buildComponent(config);
        postInstructions(config);
      }
    });

  });
};

gatherConfig();
