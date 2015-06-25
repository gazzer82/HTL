Meteor.publish('socialPosts', function(filter, limit, roles) {
    var postsReturn = [];
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      postsReturn = socialPosts.find({postStatus: filter}, {postDate: -1}, { limit: limit });
    } else if (this.userId){
      RolesList = Roles.getRolesForUser(this.userId);
      postsReturn = socialPosts.find({ $and: [{postStatus: filter},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit });
    }
    postsReturn;
    return postsReturn;
});

Meteor.publish('socialPostsNew', function(limit, roles) {
    var postsReturn = [];
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      postsReturn = socialPosts.find({postStatus: filter}, {postDate: -1}, { limit: limit });
    } else if (this.userId){
      RolesList = Roles.getRolesForUser(this.userId);
      postsReturn = socialPosts.find({ $and: [{postStatus: 'new'},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit });
    }
    postsReturn;
    return postsReturn;
});

Meteor.publish('socialPostsDeleted', function(limit, roles) {
    var postsReturn = [];
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      postsReturn = socialPosts.find({postStatus: deleted}, {postDate: -1}, { limit: limit });
    } else if (this.userId){
      RolesList = Roles.getRolesForUser(this.userId);
      postsReturn = socialPosts.find({ $and: [{postStatus: 'deleted'},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit });
    }
    postsReturn;
    return postsReturn;
});

Meteor.publish('socialPostsApproved', function(limit, roles) {
    var postsReturn = [];
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      postsReturn = socialPosts.find({postStatus: 'approved'}, {postDate: -1}, { limit: limit });
    } else if (this.userId){
      RolesList = Roles.getRolesForUser(this.userId);
      postsReturn = socialPosts.find({ $and: [{postStatus: approved},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit });
    }
    postsReturn;
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