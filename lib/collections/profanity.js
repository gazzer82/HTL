Profanity = new Meteor.Collection('profanity');

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

});

var Schemas = {};

Schemas.profanity = new SimpleSchema({
	name: {
		type: String,
		label: "Event the list is associated with",
		max: 20,
		autoform: {
            readonly: true,
        }
	},
	filterWord: {
        type: [Object],
        optional: true
            },
		    "filterWord.$.word": {
		    	type: String,
		    	optional: true,
		    	label: "Word to look for in Posts",
		    	max: 20
		    }
});

Profanity.attachSchema(Schemas.profanity);


