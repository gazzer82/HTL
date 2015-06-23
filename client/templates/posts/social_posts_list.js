Template.socialPostsList.helpers({
  socialPosts: function() {
	  	return socialPosts.find({}, {sort: {postDate: -1}});
  }
});

if (!Session.get('postFilter')){
	Session.set('postFilter', 'new');
}

Deps.autorun(function() {
	RolesList = Roles.getRolesForUser(Meteor.userId());
  	var filter = Session.get('postFilter');
  	Meteor.subscribe('socialPosts', filter, RolesList);
});