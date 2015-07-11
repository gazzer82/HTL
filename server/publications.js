Meteor.publish('socialPostsiOS', function(limit) {
    var postsReturn = [];
    RolesList = Roles.getRolesForUser(this.userId);
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      //postsReturn = socialPosts.find({sort: {postDate:-1}});
      postsReturn = socialPosts.find({sort: {postDate:-1}});
    } else if (this.userId){
      postsReturn = socialPosts.find({postEventName: {$in: RolesList}}, {sort: {postDate:-1}});
    }
    //return postsReturn;
    return socialPosts.find();
});

Meteor.publish('socialPosts', function() {
    //return socialPosts.find();
    return socialPosts.find();
});

Meteor.publish('allPosts', function(){
  return Posts.find({'author':'Tom'}, {fields: {
    date: false
  }});
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
    console.log('approving post');
    var loggedInUser = Meteor.user();
    if (loggedInUser) {
      socialPosts.update(postID, {$set: {postStatus: "approved"}});
    }
  },
  deletePost: function (postID) {
    console.log('deleting post');
    var loggedInUser = Meteor.user();
    if (loggedInUser) {
    socialPosts.update(postID, {$set: {postStatus: "deleted"}});
    }
  }
});

Meteor.publish('publicLists', function() {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
    return Lists.find({userId: {$exists: false}});
  }
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('todos', function(listId) {
  check(listId, String);

  return Todos.find({listId: listId});
});