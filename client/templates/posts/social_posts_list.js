Template.socialPostsList.helpers({
  socialPosts: function() {
  	return socialPosts.find({}, {sort: {postDate: -1}});
  }
});