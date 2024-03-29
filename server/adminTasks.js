Meteor.methods({
  performAdminTask: function (event, action) {
    var loggedInUser = Meteor.user();
    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin'])) {
      console.log('Performing action ' + action + ' on event ' + event);
      event = HTLEvents.findOne({eventName: event});
      switch (action) {
        case "resetTwitter":
          resetAction('twitter', event._id);
            break;
        case "resetVine":
          resetAction('vine', event._id);
            break;
        case "resetInstagram":
          resetAction('instagram', event._id);
            break;
        case "resetAll":
          resetAll(event._id);
            break;
        case "deleteTwitter":
          deleteByNetworkAction('twitter', event._id);
            break;
        case "deleteVine":
          deleteByNetworkAction('vine', event._id);
            break;
        case "deleteInstagram":
          deleteByNetworkAction('instagram', event._id);
            break;
        case "deleteNew":
          deleteByStatusAction('new', event._id);
            break;
        case "deleteApproved":
          deleteByStatusAction('approved', event._id);
            break;
        case "deleteDeleted":
          deleteByStatusAction('deleted', event._id);
            break;
        case "deleteAll":
          deleteAll(event._id);
            break;
        case "fullReset":
          resetAndDeleteAll(event._id);
            break;
      }
    } else {
      console.log("User not autheticated to peform action");
    }
  },
  pruneCollections: function (max) {
    var events = HTLEvents.find().fetch();

  }
});

deleteByNetworkAction = function (network, event){
  console.log("Deleting all " + network + " posts for event " + event);
  socialPosts.remove({postEventID: event, postType: network});
};

deleteByStatusAction = function (status, event){
  console.log("Deleting all " + status + " posts for event " + event);
  socialPosts.remove({postEventID: event, postStatus: status});
};

resetAction = function (network, event){
  eventToReset = HTLEvents.find({_id: event}).fetch();
  console.dir(eventToReset[0].searchTerms[0].term);
  for (var i in eventToReset[0].searchTerms){
    console.log("Resetting ID for " + network + " for event " + event);
    if(network === "twitter"){
      HTLEvents.update({_id :event, "searchTerms.term":eventToReset[0].searchTerms[i].term} , {$set: {"searchTerms.$.latestTwitter": 0}});
    } else if (network === "instagram") {
      HTLEvents.update({_id :event, "searchTerms.term":eventToReset[0].searchTerms[i].term} , {$set: {"searchTerms.$.latestInstagram": 0}});
    } else if (network === "vine") {
      HTLEvents.update({_id :event, "searchTerms.term":eventToReset[0].searchTerms[i].term} , {$set: {"searchTerms.$.latestVine": 0}});
    }
  }
};

resetAll = function (event){
  eventToReset = HTLEvents.find({_id: event}).fetch();
  console.dir(eventToReset[0].searchTerms[0].term);
  for (var i in eventToReset[0].searchTerms){
    console.log("Resetting ID for all networks for event " + event);
      HTLEvents.update({_id :event, "searchTerms.term":eventToReset[0].searchTerms[i].term} , {$set: {"searchTerms.$.latestTwitter": 0}});
      HTLEvents.update({_id :event, "searchTerms.term":eventToReset[0].searchTerms[i].term} , {$set: {"searchTerms.$.latestInstagram": 0}});
      HTLEvents.update({_id :event, "searchTerms.term":eventToReset[0].searchTerms[i].term} , {$set: {"searchTerms.$.latestVine": 0}});
  }
};

deleteAll = function (event){
  console.log("Deleteing all posts for event " + event);
  socialPosts.remove({postEventID: event});
};

resetAndDeleteAll = function (event){
  console.log("Performing full reset and delete for " + event);
  resetAll(event);
  deleteAll(event);
};