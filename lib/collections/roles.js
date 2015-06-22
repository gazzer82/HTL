var Schemas = {};
Schemas.roles = new SimpleSchema({
	name: {
		type: String,
		label: "Role Name",
		max: 20
	}
});

roles.attachSchema(Schemas.roles);