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