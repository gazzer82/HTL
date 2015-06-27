Template.layoutWeb.helpers({
	pageTitle: function() { return Session.get('pageTitle'); },
});

Template.layoutWeb.rendered = function () {
  	Session.set('currentTab', 'socialPostsListNew');
};