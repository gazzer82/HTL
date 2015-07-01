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
          resetAllAction(event._id);
            break;
      }
    } else {
      console.log("User not autheticated to peform action");
    }
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
  console.log("Resetting ID for " + network + " for event " + event);
  if(network === "twitter"){
    HTLEvents.update({_id :event} , {$set: {"searchTerms.$.latestTwitter": 0}});
  } else if (network === "instagram") {
    HTLEvents.update({_id :event} , {$set: {"searchTerms.$.latestInstagram": 0}});
  } else if (network === "vine") {
    HTLEvents.update({_id :event} , {$set: {"searchTerms.$.latestVine": 0}});
  }
};

resetAllAction = function (event){
  console.log("Peforming master reset for event " + event);
  HTLEvents.update({_id :event} , {$set: {"searchTerms.$.latestTwitter": 0}});
  HTLEvents.update({_id :event} , {$set: {"searchTerms.$.latestInstagram": 0}});
  HTLEvents.update({_id :event} , {$set: {"searchTerms.$.latestVine": 0}});
  socialPosts.remove({postEventID: event});
};