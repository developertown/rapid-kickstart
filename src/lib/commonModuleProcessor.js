
const fs = require('fs');
const Path = require('path');

module.exports = (projectDef, moduleDef) => {
  const directories = [
    ["src"],
    ["src", "actions"],
    ["src", "components"],
    ["src", "containers"],
    ["src", "reducers"],
    ["src", "store"],
    ["tests"]
  ]

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
