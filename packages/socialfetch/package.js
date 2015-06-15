Package.describe({
  name: 'gazzer82:socialfetch',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A package to fetch a given search term from Twitter, Instagram and Vine',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
    "body-parser": "1.12.0",
    "cookie-parser": "1.3.4",
    "debug": "2.1.1",
    "morgan": "1.5.1",
    "oauth": "0.9.12",
    "request": "2.57.0",
    "twitter": "https://github.com/desmondmorris/node-twitter/tarball/ea54550d991cf625e4d1e220e17ab99c6843f22b"
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('mongo', ['server']);
  api.addFiles([
    'socialfetch.js'], ['server']);
    if (api.export)
      api.export('socialfetch');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gazzer82:socialfetch');
  api.addFiles([
    'instagram_fetch.js',
    'twitter_fetch.js',
    'vine_fetch.js',
    'socialfetch-tests.js'], ['server']);
});
