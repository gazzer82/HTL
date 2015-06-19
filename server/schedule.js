if (Meteor.isServer) {
  // optionally set the collection's name that synced cron will use
  SyncedCron.config({
    collectionName: 'systemTimer',
    collectionTTL: 3600
  });

  SyncedCron.add({
    name: 'Creating recurring social media fetch CRON Job',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 5 minutes');
  },
  job: function(intendedAt) {
      //Load the NPM's required
      var util = Npm.require('util');
      var fs = Npm.require('fs');
      var os = Npm.require('os');
      var path = Npm.require('path');

      //Log the intedned run time and that we're starting
      console.log(intendedAt);
      console.log("starting fetch");

      //Fetching the enabled events
      Meteor.call('fetchEnabledEvents', function (error, eventList) {
        var posts = [];
        var eventsToFetch = 0;
        var eventsFetched = 0;
        if (!eventList){
          throw(err);
        } else {
          eventsToFetch = eventList.length;
          for (var eventi in eventList){
            /*jshint loopfunc: true */
            console.log("Event Object = " + util.inspect(eventList[eventi], false, null));
            socialfetch.fetch(eventList[eventi], Meteor.bindEnvironment(function(err, returnValue){
              /*jshint loopfunc: true */
              if (err.length) {
                console.log(err.length + " errors located");
                for (var i in err){
                  console.log(err[i]);
                  Meteor.call('fetchErrorsInsert', err[i], function(error, result){
                  /*jshint loopfunc: true */
                  if(error)
                    Errors.throw(error.reason);
                  });
                }
              } else if (returnValue) {

                posts.push(returnValue);
                eventsFetched ++;
                if (eventsFetched == eventsToFetch) {
                  Meteor.call('processPosts', posts, function (error) {
                    console.log("All went to plan");
                  });
                }
                
                //console.log("We have " + returnValue.length + " seaches returned");
                //for (i in returnValue){
                  //var searchObject = returnValue[i][1]
                  //console.log("Searched Object = " + util.inspect(searchObject, false, null));

                          /*Meteor.call('searchTermsUpdateLatest', eventList[eventi]._id, returnValue[i][1].searchedTerm, returnValue[i][1].networkSearched, returnValue[i][1].latestID, function (error, eventList) {
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
                        }});*/
                  //}
              }
            }));
          }

        }});
    }
  }),

  Meteor.methods({
    processPosts: function(events) {
      //We have been sent an array of events, which contain the returned posts so let's process them.
      console.log("We have " + events.length + " events to process");
      //Ok so let's start looping through the events 1 at a time.
      for (var i in events){
        //Ok so now we need to process this event, let's loop through each terms returned posts.
        console.log("We have " + events[i].length + " terms to process");
        for (var i2 in events[i]){
          //Ok first off let's update the latest fetched ID for this search term.
          /*jshint loopfunc: true */
          Meteor.call('updateTermID', events[i][i2][1], function (err, value) {
              if (err){
                throw(err);
              }
          });

          //Now lets loop through and add the posts for this term and network to Mongo
          for (var i3 in events[i][i2][0]) {
          /*jshint loopfunc: true */
            //Let's add each post to the database.
            Meteor.call('socialPostsInsert', events[i][i2][0][i3], function(err, result){
              /*jshint loopfunc: true */
              if (err){
                throw(err);
              }
            });
          }
          //var searchObject = postsArray;
          //console.log("Searched Object = " + util.inspect(searchObject, false, null));
        }
      }
      return;
    },
    updateTermID: function(eventTerm) {
      //So checking to see which network it is that we've got posts from, and updating the lastes ID for that term/network
      console.log(eventTerm);
      if(eventTerm.networkSearched === "twitter"){
        console.log("Updating twitter latest id for " + eventTerm.searchedTerm);
        HTLEvents.update({_id :eventTerm.eventID, "searchTerms.term":eventTerm.searchedTerm} , {$set: {"searchTerms.$.latestTwitter": eventTerm.latestID}});
      } else if (eventTerm.networkSearched === "instagram") {
        console.log("Updating instagram latest id for " + eventTerm.searchedTerm);
        HTLEvents.update({_id :eventTerm.eventID, "searchTerms.term":eventTerm.searchedTerm} , {$set: {"searchTerms.$.latestInstagram": eventTerm.latestID}});
      } else if (eventTerm.networkSearched === "vine") {
        console.log("Updating vine latest id for " + eventTerm.searchedTerm);
        HTLEvents.update({_id :eventTerm.eventID, "searchTerms.term":eventTerm.searchedTerm} , {$set: {"searchTerms.$.latestVine": eventTerm.latestID}});
      }
    }
  }),
  
  Meteor.startup(function (){
    //socialPosts = new Mongo.Collection('socialposts');
    //fetchErrors = new Mongo.Collection('fetcherrors');
    // code to run on server at startup
    SyncedCron.start();
    // Stop jobs after 15 seconds
    //Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });
}