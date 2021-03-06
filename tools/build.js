/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const fs = require('fs');
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

if (inInstall()) {
  process.exit(0);
}

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log('Building CommonJS modules ...');

exec('babel src -d . --ignore __tests__', {
  BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel src -d es --ignore __tests__', {
  BABEL_ENV: 'es',
});

console.log('\nBuilding react-router-dom.js ...');

exec('webpack src/index.js umd/react-floating-button-menu.js', {
  NODE_ENV: 'production',
});

console.log('\nBuilding react-router-dom.min.js ...');

exec('webpack -p src/index.js umd/react-floating-button-menu.min.js', {
  NODE_ENV: 'production',
});

const size = gzipSize.sync(
  fs.readFileSync('umd/react-floating-button-menu.min.js'),
);

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
