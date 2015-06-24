Template.layout.helpers({
	pageTitle: function() { return Session.get('pageTitle'); },
	environment: function() {
		if (Meteor.isCordova){
			return "mobile";
		} else {
			return "web";
			//return "mobile";
		}
  	}
});

Template.layout.rendered = function () {
  	Session.set('currentTab', 'socialPostsListNew');
};