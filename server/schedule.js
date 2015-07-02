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
      return parser.text('every 30 seconds');
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
            //console.log("Event Object = " + util.inspect(eventList[eventi], false, null));
            socialfetch.fetch(eventList[eventi], Meteor.bindEnvironment(function(err, returnValue){
              /*jshint loopfunc: true */
              if (err.length) {
                console.log(err.length + " errors located");
                for (var i in err){
                  console.log(err[i]);
                  throw err[i];
                }
              } else if (returnValue) {

                posts.push(returnValue);
                eventsFetched ++;
                if (eventsFetched == eventsToFetch) {
                  Meteor.call('processPosts', posts, function (error) {
                    console.log("All went to plan");
                  });
                }

              }
            }));
          }

        }
      });
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
              if (i3 == (Object.keys(events[i][i2][0]).length - 1)){
                Meteor.call('trimCollections', 3);
              }
            });
          }
        }
      }
      return;
    },

    updateTermID: function(eventTerm) {
      //So checking to see which network it is that we've got posts from, and updating the lastes ID for that term/network
      //console.log(eventTerm);
      if(eventTerm.networkSearched === "twitter"){
        //console.log("Updating twitter latest id for " + eventTerm.searchedTerm);
        HTLEvents.update({_id :eventTerm.eventID, "searchTerms.term":eventTerm.searchedTerm} , {$set: {"searchTerms.$.latestTwitter": eventTerm.latestID}});
      } else if (eventTerm.networkSearched === "instagram") {
        //console.log("Updating instagram latest id for " + eventTerm.searchedTerm);
        HTLEvents.update({_id :eventTerm.eventID, "searchTerms.term":eventTerm.searchedTerm} , {$set: {"searchTerms.$.latestInstagram": eventTerm.latestID}});
      } else if (eventTerm.networkSearched === "vine") {
        //console.log("Updating vine latest id for " + eventTerm.searchedTerm);
        HTLEvents.update({_id :eventTerm.eventID, "searchTerms.term":eventTerm.searchedTerm} , {$set: {"searchTerms.$.latestVine": eventTerm.latestID}});
      }
    },

    trimCollections: function() {
      events = HTLEvents.find();
      events.forEach(function (event) {
        if (event.autoTrimEnable){
          if (socialPosts.find({$and: [{postStatus: 'new'},{postEventID: event._id}]}).count() > event.autoTrimCount){
            limit = (socialPosts.find({$and: [{postStatus: 'new'},{postEventID: event._id}]}).count() - event.autoTrimCount);
            console.log('Removing ' + limit + ' posts');
            var eventsToPerge = socialPosts.find({$and: [{postStatus: 'new'},{postEventID: event._id}]},{limit: limit},{fields: {_id : 1}}).fetch();
            var ids = [];
            for (var i in eventsToPerge){
              ids.push(eventsToPerge[i]._id);
            }
            //console.log(eventsToPerge);
            console.log(ids);
            console.log(event.eventName + ' is ' + socialPosts.find({$and: [{postStatus: 'new'},{postEventID: event._id}]}).count() + ' long and the maximum size is ' + event.autoTrimCount + ' so trimming ' + limit + ' posts.');
            socialPosts.remove({_id: {$in: ids}});
            //socialPosts.remove({ $and: [{postStatus: 'new'},{postEventID: event._id}]}, {sort: {postDate:1}},{limit: socialPosts.find({$and: [{postStatus: 'new'},{postEventID: event._id}]}).count() - size});
          }
        }
      });
    }
  }),
  
  Meteor.startup(function (){
    SyncedCron.start();
  });
}