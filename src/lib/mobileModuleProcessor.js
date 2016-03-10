
const fs = require('fs');
const execSync = require('child_process').execSync;
const Path = require('path');

const generator = 'react-native init mobile';

module.exports = (projectDef, moduleDef) => {
  try {
    execSync(generator, {cwd: projectDef.root});
  } catch (e) {
    console.log("\n\nError executing react-native project generator.  Did you install it with: `npm install react-native-cli`?");
    process.exit(1);
  }

  let pkgJSONPath = Path.join(moduleDef.root, "package.json");
  let pkg = JSON.parse(fs.readFileSync(pkgJSONPath));

  pkg = Object.assign(pkg, {
    name: moduleDef.name,
    description: moduleDef.name,
    dependencies: Object.assign(
      {},
      pkg.dependencies,
      moduleDef.dependencies
    ),
    devDependencies: Object.assign(
      {},
      pkg.devDependencies,
      moduleDef.devDependencies
    )
  });

  fs.writeFileSync(pkgJSONPath, JSON.stringify(pkg, null, 2));

};
