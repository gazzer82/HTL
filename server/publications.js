Meteor.publish('socialPosts', function() {
	return socialPosts.find();
});