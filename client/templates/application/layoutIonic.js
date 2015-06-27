Template.layoutIonic.helpers({
	pageTitle: function() { return Session.get('pageTitle'); },
});

Template.layoutIonic.rendered = function () {
  	Session.set('currentTab', 'socialPostsListNew');
};