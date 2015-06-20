Template.socialPostsList.helpers({
  socialPosts: function() {
  	return socialPosts.find({}, {sort: {postDate: -1}});
  }
});

if (!Session.get('postFilter')){
	Session.set('postFilter', 'approved');
}

Deps.autorun(function() {
  var filter = Session.get('postFilter');
  Meteor.subscribe('socialPosts', filter);
});