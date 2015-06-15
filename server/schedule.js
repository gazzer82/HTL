if (Meteor.isServer) {
  // optionally set the collection's name that synced cron will use
  SyncedCron.config({
    collectionName: 'systemTimer'
  });

  SyncedCron.add({
    name: 'Creating recurring social media fetch CRON Job',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 1 minute');
    }, 
    job: function(intendedAt) {
      //console.log(intendedAt);
      socialfetch.fetch("vine", "badger", 1, 1, function(err, returnValue) {
          if(err){
                //console.log('We have an errror');
                //res.json(err);
                console.log(err);
          } else {
                //console.log('All went fine');
                //res.json(returnValue);
                console.log(returnValue);
          }
      });
      //var posts = socialfetch.fetch("twitter", "badger", 1, 1);
      ///console.log(posts);
    }
  });
  
  Meteor.startup(function () {
      var defaultData = {
        twitterEnabled: true,
        instagramEnabled: true,
        vineEnabled: true,
        fetchCount: 1,
          searchTerms: [
            {
              term: "badger",
              latestTwitter: 0,
              latestInstagram: 0,
              latestVine: 0
            },
            {
              term:"freedom",
              latestTwitter: 0,
              latestInstagram: 0,
              latestVine: 0
            }
          ]
    }
    // code to run on server at startup
    //SyncedCron.start();
    socialfetch.fetch(defaultData, function(err, returnValue){
      if (err) {
        console.log(err.length + " errors located");
        console.log(err);
      } else {
        console.log("All went to plan");
        console.log(returnValue);
      }
    });
    // Stop jobs after 15 seconds
    //Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });
}