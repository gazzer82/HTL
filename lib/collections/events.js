HTLEvents = new Mongo.Collection('htlevents');

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
    	}
		HTLEvents.update(eventID, {$set: postProperties}, function(error) {
    		if (error){
    			//display the error to the user
    			Errors.throw(error.reason);
    		} else {
    			console.log("Update completed");
    		}
    	})
		//console.log('Updating:' + eventID);
		//console.log(eventID + " " + searchTerm + " " + network + " " + latest);
		//console.log(HTLEvents.find({_id: eventID}));
		//console.log(HTLEvents.find({_id: eventID , "searchTerms.term" : searchTerm}));
		var err = undefined
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
			err = "Unable to update latestID, one or more values not set in method call."
			console.log("Unable to update latestID, one or more values not set in method call.")
		}
		console.log('Updated:')
		console.log(HTLevents.find({_id : eventID}));
	},
});