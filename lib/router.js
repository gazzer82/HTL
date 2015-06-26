if (Meteor.isCordova) {
	Router.configure({
		layoutTemplate: 'layoutIonic',
		waitOn: function() { return Meteor.subscribe('socialPosts'); }
		//loadingTemplate: 'loading',
		//notFoundTemplate: 'notFound',
	});
} else {
		Router.configure({
		layoutTemplate: 'layoutWeb',
		waitOn: function() { return Meteor.subscribe('socialPosts'); }
		//loadingTemplate: 'loading',
		//notFoundTemplate: 'notFound',
	});
}

Router.route('/', function() {
  Router.go('/new');
});

Router.map(function() {
  if (Meteor.isCordova) {
    this.route('new', {
      	path: '/new',
      	template: 'socialPostsListIonic',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'new');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	//RolesList = Roles.getRolesForUser(Meteor.userId());
    	templateData = { 
    		//socialPosts: socialPosts.find({postStatus: this.params.type})
    		socialPosts: socialPosts.find({postStatus: 'new'}, {postDate: -1})
    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
    	};
    	return templateData;
  		}
    }),
    this.route('approved', {
      	path: '/approved',
      	template: 'socialPostsListIonic',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'approved');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	//RolesList = Roles.getRolesForUser(Meteor.userId());
    	templateData = { 
    		//socialPosts: socialPosts.find({postStatus: this.params.type})
    		socialPosts: socialPosts.find({postStatus: 'approved'}, {postDate: -1})
    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
    	};
    	return templateData;
  		}
    }),
    this.route('deleted', {
      	path: '/deleted',
      	template: 'socialPostsListIonic',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'deleted');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	//RolesList = Roles.getRolesForUser(Meteor.userId());
    	templateData = { 
    		//socialPosts: socialPosts.find({postStatus: this.params.type})
    		socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
    	};
    	return templateData;
  		}
    });
  } else {
    this.route('new', {
      path: '/new',
      template: 'socialPostsListWeb',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'new');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                                 
    	},
      data: function() {
      	//RolesList = Roles.getRolesForUser(Meteor.userId());
    	templateData = { 
    		//socialPosts: socialPosts.find({postStatus: this.params.type})
    		socialPosts: socialPosts.find({postStatus: 'new'}, {postDate: -1})
    	};
    	return templateData;
  		}
    }),
    this.route('approved', {
      path: '/approved',
      template: 'socialPostsListWeb',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'approved');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                                 
    	},
      data: function() {
      	//RolesList = Roles.getRolesForUser(Meteor.userId());
    	templateData = { 
    		//socialPosts: socialPosts.find({postStatus: this.params.type})
    		socialPosts: socialPosts.find({postStatus: 'approved'}, {postDate: -1})
    	};
    	return templateData;
  		}
    }),
    this.route('deleted', {
      	path: '/deleted',
      	template: 'socialPostsListWeb',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'deleted');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	//RolesList = Roles.getRolesForUser(Meteor.userId());
    	templateData = { 
    		//socialPosts: socialPosts.find({postStatus: this.params.type})
    		socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
    	};
    	return templateData;
  		}
    });
  }
});

//Router.route('/', {name: 'socialPostsListNew'});

/*Router.route('/approved', {name: 'socialPostsListApproved'});

Router.route('/deleted', {name: 'socialPostsListDeleted'});*/

Router.route('/profile', {name: 'profile'});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login'
});

AccountsTemplates.configureRoute('forgotPwd', {
	name: 'forgot',
	path: '/forgot'
});

Router.plugin('ensureSignedIn', {
   only: ['socialPostsListNew', 'socialPostsListApproved', 'socialPostsListDeleted', 'socialPostsListWeb', 'socialPostsListIonic', 'new', 'apporved', 'deleted', 'profile']
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