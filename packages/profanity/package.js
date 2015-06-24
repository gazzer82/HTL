Package.describe({
  name: 'gazzer82:profanity',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
    "badwords": "https://github.com/gazzer82/badwords/tarball/5e601b787d4043d6868f3d5d815cbdda32d98410",
    "profanity-util": "https://github.com/gazzer82/nodejs-profanity-util/tarball/ef0abba9e0b621a00f2a2be573b0448030d052bd"
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles([
    'profanity.js']);
    if (api.export)
      api.export('profanity');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gazzer82:profanity');
  api.addFiles('profanity-tests.js');
});
