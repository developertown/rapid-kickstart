import Firebase from 'firebase';

// === Required Configuration options ==========================================

// A "Friendly" app name string
const appName = undefined;

// The "short" name of your app as firebase knows it, not the full URL
const firebaseAppName = undefined;

// Set this to false when you're done with the config :)
const appNeedsConfiguration = true;

// === End Required Configuration options ======================================


if (appNeedsConfiguration) {
  const msg = "Please update configuration in web/src/config.js";
  alert(msg);
  throw `Unconfigured Application: ${msg}`;
}

const firebase = new Firebase(`https://${firebaseAppName}.firebaseio.com`);
export { appName, firebase }
