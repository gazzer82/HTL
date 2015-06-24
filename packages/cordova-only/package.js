Package.describe({
  name: "cordova-only",
  summary: "Add dependencies and styling for Cordova app.",
  version: "0.0.1"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.0");

  //Add meteor ionic packages
  api.use([
    'meteoric:ionic',
    ],'web.cordova');

  //Add ionic styling
  api.use([
    'fourseven:scss',
    'meteoric:ionic-sass',
    'meteoric:ionicons-sass'
    ],'server');

  // Add Ionic styling
  api.addFiles(['import_cordova.scss'], ['web.cordova']);

});
