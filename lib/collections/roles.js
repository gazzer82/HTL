Meteor.roles.allow({
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
});

/*var RolesSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Role Name",
		max: 20
	}
});

Meteor.roles.attachSchema(RolesSchema);*/