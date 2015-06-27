HTLEvents = new Meteor.Collection('htlevents');

HTLEvents.allow({
	update: function(userId, role) {
		var loggedInUser = Meteor.user();
		if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	},
	remove: function(userId, role) {
		var loggedInUser = Meteor.user();
		if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	},
	insert: function(userId, role) {
		var loggedInUser = Meteor.user();
		if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	}
}),

Meteor.methods({
	fetchEnabledEvents: function() {
		return HTLEvents.find({enabled: true}, {}).fetch();
	},
	searchTermsUpdateLatest: function(eventID, searchTerm, network, latest) {
		var postProperties = {
      		searchTerms:{
      			term: "badger",
      			latestTwitter: 100
      		}
    	};
		HTLEvents.update(eventID, {$set: postProperties}, function(error) {
    		if (error){
    			throw error;
    		} else {
    			console.log("Update completed");
    		}
    	});
		var err;
		if (eventID && searchTerm && network && latest) {
			console.log("All parameters set, now updating the " + network + " for " + searchTerm);
			if(network === "twitter"){
				console.log("Updating twitter latest id for " + searchTerm);
				HTLevents.update( {_id : eventID} , 
                {$set : {"enabled" : false}});
			} else if (network == "instagram") {
				console.log("Updating instagram latest id for " + searchTerm);
				HTLevents.update({_id : { _str: eventID } , "searchTerms.term":searchTerm} , {$inc: {"searchTerms.$.latestInstagram": latest}});
			} else if (network == "vine") {
				console.log("Updating vine latest id for " + searchTerm);
				HTLevents.update({_id : { _str: eventID } , "searchTerms.term":searchTerm} , {$inc: {"searchTerms.$.latestVine": latest}});
			}
		} else {
			err = "Unable to update latestID, one or more values not set in method call.";
			console.log("Unable to update latestID, one or more values not set in method call.");
		}
		console.log('Updated:');
		console.log(HTLevents.find({_id : eventID}));
	},
});

var Schemas = {};

Schemas.htlevents = new SimpleSchema({
	eventName: {
		type: String,
		label: "Event Name",
		max: 20
	},
	twitterEnabled: {
		type: Boolean,
		label: "Enable Twitter"
	},
	instagramEnabled: {
		type: Boolean,
		label: "Enable Instagram"		
	},
	vineEnabled: {
		type: Boolean,
		label: "Enable Vine"		
	},
	fetchCount: {
		type: Number,
		label: "Maximum posts to fetch, per network, per search term.",
		max: 5,
		min: 1
	},
	enabled: {
		type: Boolean,
		label: "Enable this event"
	},
	searchTerms: {
        type: [Object],
        optional: true
            },
		    "searchTerms.$.term": {
		    	type: String,
		    	optional: true,
		    	label: "Word or hashtag to search for",
		    	max: 20
		    },
		    "searchTerms.$.latestTwitter": {
		    	type: Number,
		    	optional: true,
		    	autoform: {
            		readonly: true,
        		}
		    },
		    "searchTerms.$.latestInstagram": {
		    	type: String,
		    	optional: true,
		    	autoform: {
            		readonly: true,
        		}
		    },
		    "searchTerms.$.latestVine": {
		    	type: Number,
		    	optional: true,
		    	autoform: {
            		readonly: true,
        		}
		    }
});

HTLEvents.attachSchema(Schemas.htlevents);

HTLEvents.after.insert(function (userId, doc) {
    if(!Meteor.roles.findOne({name:doc.eventName})){
    	console.log('No role detected for event ' + doc.eventName +' , creating one.');
    	Roles.createRole(doc.eventName);
    }
    if(!Profanity.findOne({name:doc.eventName})){
    	console.log('No profanity list detected for event ' + doc.eventName +' , creating one.');
    	Profanity.insert({name: doc.eventName});
    }
});

HTLEvents.after.update(function (userId, doc, fieldNames, modifier, options) {
	console.log('Renaming role ' + this.previous.eventName + ' to ' + doc.eventName);
  if (this.previous.eventName != doc.eventName){
  	Role = Meteor.roles.findOne({name:this.previous.eventName});
  	if (Role){
  		Meteor.roles.update(Role._id, {$set: {name: doc.eventName}});
  	} else {
  		Roles.createRole(doc.eventName);
  	}
  	profanity = Profanity.findOne({name:this.previous.eventName});
  	if (profanity){
  		Profanity.update(profanity._id, {$set: {name: doc.eventName}});
  	} else {
  		Profanity.insert({name:doc.eventName});
  	}
  }
}, 
{fetchPrevious: true});

HTLEvents.after.remove(function (userId, doc) {
	console.log('Deleting role for event ' + doc.eventName);
  Meteor.roles.remove({name:doc.eventName});
  Profanity.remove({name:doc.eventName});
});


