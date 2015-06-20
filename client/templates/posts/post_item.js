Template.postItem.helpers({
  ownPost: function() {
  	console.log(this.userId + Meteor.userId());
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.postItem.events({
  'click .approvePost' : function (event) {
    Meteor.call('approvePost', this._id);
  },
    'click .deletePost' : function (event) {
    Meteor.call('deletePost', this._id);
  }
});