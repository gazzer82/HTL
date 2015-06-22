var RolesSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Role Name",
		max: 20
	}
});

Meteor.roles.attachSchema(RolesSchema);