Meteor.publish('socialPosts', function(filter, limit, roles) {
  console.log('fetching ' + limit + ' posts');
    var postsReturn = [];
    //console.log(this);
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      postsReturn = socialPosts.find({postStatus: filter}, { limit: limit });
    } else if (this.userId){
      RolesList = Roles.getRolesForUser(this.userId);
      console.log(RolesList);
      postsReturn = socialPosts.find({ $and: [{postStatus: filter},{postEventName: {$in: RolesList}}]}, { limit: limit });
    }
    return postsReturn;
});

Meteor.publish('users', function(filter) {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
      return  users.find();
  }
});

Meteor.publish("HTLEvents", function() {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
      return HTLEvents.find();
  }
});

Meteor.methods({
  approvePost: function (postID) {
    var loggedInUser = Meteor.user();
    if (loggedInUser) {
      socialPosts.update(postID, {$set: {postStatus: "approved"}});
    }
  },
  deletePost: function (postID) {
    var loggedInUser = Meteor.user();
    if (loggedInUser) {
    socialPosts.update(postID, {$set: {postStatus: "deleted"}});
    }
  }
});