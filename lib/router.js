Router.configure({
	layoutTemplate: 'layout'
	//loadingTemplate: 'loading',
	//notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'socialPostsListNew'});

Router.route('/approved', {name: 'socialPostsListApproved'});

Router.route('/deleted', {name: 'socialPostsListDeleted'});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login'
});

AccountsTemplates.configureRoute('forgotPwd', {
	name: 'forgot',
	path: '/forgot'
});

Router.plugin('ensureSignedIn', {
   only: ['socialPostsListNew', 'socialPostsListApproved', 'socialPostsListDeleted']
});

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