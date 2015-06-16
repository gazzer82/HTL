if (Meteor.isServer) {
  // optionally set the collection's name that synced cron will use
  SyncedCron.config({
    collectionName: 'systemTimer'
  });

  SyncedCron.add({
    name: 'Creating recurring social media fetch CRON Job',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 30 seconds');
    }, 
    job: function(intendedAt) {
      var util = Npm.require('util');
      var fs = Npm.require('fs');
      var os = Npm.require('os');
      var path = Npm.require('path');

      var file = path.join('/temp', 'JSON_Export.txt');
      console.log(intendedAt);
      console.log("starting fetch");
    var defaultData = {
        twitterEnabled: true,
        instagramEnabled: false,
        vineEnabled: false,
        fetchCount: 2,
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
    Meteor.call('fetchEnabledEvents', function (error, eventList) {
    //console.log(eventslist);
      if (!eventList){
        throw(err)
      } else {
          for (var eventi in eventList){
            console.log("Event Object = " + util.inspect(eventList[eventi], false, null));
              //for (var termi in eventList[eventi].searchTerms){
                //searchTerm = eventList[eventi].searchTerms[termi]
                //console.log(searchTerm)


                
                socialfetch.fetch(eventList[eventi], Meteor.bindEnvironment(function(err, returnValue){
                  if (err.length) {
                    console.log(err.length + " errors located");
                    //console.log(err);
                    for (i in err){
                          console.log(err[i]);
                          Meteor.call('fetchErrorsInsert', err[i], function(error, result){
                          //if(error)
                            //Errors.throw(error.reason);
                          });
                    }
                  } 
                  else if (returnValue) {
                    console.log("All went to plan");
                    console.log("We have " + returnValue.length + " seaches returned");
                    //fs.writeFile('output.json',JSON.stringify(returnValue) , function (err) {console.log('written');});
                    //console.log(returnValue);
                    for (i in returnValue){
                        //console.log("Term searched " + returnValue[i][1].searchedTerm)
                        //console.log("LatestID =  " + returnValue[i][1].latestID)
                        var searchObject = returnValue[i][1]
                        console.log("Searched Object = " + util.inspect(searchObject, false, null));
                        Meteor.call('searchTermsUpdateLatest', eventList[eventi]._id, returnValue[i][1].searchedTerm, returnValue[i][1].networkSearched, returnValue[i][1].latestID, function (error, eventList) {
                        //Update the latest ID for this seach term.
                        //console.log("These are the posts for " + util.inspect(returnValue[0][0][1], false, null));
                        for (i2 in returnValue[i][0]) {
                            //console.log(util.inspect(returnValue[0][i][i2], false, null));
                            //console.log(returnValue[i][0][i2].postText);
                            Meteor.call('socialPostsInsert', returnValue[i][0][i2], function(err, result){
                              if (err){
                                throw(err)
                              }
                          });
                      }});
                    }
                  }
                }));
            //}
          }
      }});
      //var posts = socialfetch.fetch("twitter", "badger", 1, 1);
      ///console.log(posts);
    }
  });
  
  Meteor.startup(function (){

    //socialPosts = new Mongo.Collection('socialposts');
    //fetchErrors = new Mongo.Collection('fetcherrors');
    // code to run on server at startup
    SyncedCron.start();
    // Stop jobs after 15 seconds
    //Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });
}