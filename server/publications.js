Meteor.publish('socialPosts', function(filter) {
	if(filter === 'new'){
   		return  socialPosts.find({postStatus: "new"});
	} 
	else if(filter === 'approved') {
   		return  socialPosts.find({postStatus: "approved"});
	}
	else if(filter === 'deleted') {
   		return  socialPosts.find({postStatus: "deleted"});
   	}
});

Meteor.methods({
  approvePost: function (postID) {
    socialPosts.update(postID, {$set: {postStatus: "approved"}});
  },
  deletePost: function (postID) {
    socialPosts.update(postID, {$set: {postStatus: "deleted"}});
  }
})