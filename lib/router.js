Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('socialPosts'); }
});

Router.route('/', {name: 'socialPostsList'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()){
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});