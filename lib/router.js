if (Meteor.isCordova) {
	Router.configure({
		layoutTemplate: 'layoutIonic',
		waitOn: function() { return Meteor.subscribe('socialPosts'); },
		preloadFiles: {
        // Use these on *ALL* pages
        'common': {
            js: ['http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js',
                'http://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.1/jquery.slimscroll.min.js',
                'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min.js',
                'http://cdnjs.cloudflare.com/ajax/libs/foundation/5.2.3/js/foundation.min.js',
                'http://cdnjs.cloudflare.com/ajax/libs/velocity/0.0.22/jquery.velocity.min.js',
                'http://cdnjs.cloudflare.com/ajax/libs/velocity/0.0.22/velocity.ui.js'
            ],
            css: [
                'http://fonts.googleapis.com/css?family=Open+Sans:400,700,300,600',
                'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css'
            ]
        }
    },
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
      	controller: PreloadController,
      	template: 'socialPostsListIonic',
    	onBeforeAction: function () {
    		Session.set('currentTab', 'new');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	console.log('checking roles: ' + Roles.getRolesForUser(Meteor.userId()));
      	RolesList = Roles.getRolesForUser(Meteor.userId());
      		var user = Meteor.user();
	      	if ( user && Roles.userIsInRole(user, ['admin'])){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		socialPosts: socialPosts.find({postStatus: 'new'}, {sort: {postDate:-1}})
		    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
		    	};
		    	return templateData;
		    } else if (user){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		//socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
		    		socialPosts: socialPosts.find({ $and: [{postStatus: 'new'},{postEventName: {$in: RolesList}}]}, {sort: {postDate:-1}})
		    	};
		    	return templateData;
		    }
  		},
  		fastRender: true
    }),
    this.route('approved', {
      	path: '/approved',
      	controller: PreloadController,
      	template: 'socialPostsListIonic',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'approved');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	RolesList = Roles.getRolesForUser(Meteor.userId());
      	var user = Meteor.user();
	      	if (user && Roles.userIsInRole(user, ['admin'])){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		socialPosts: socialPosts.find({postStatus: 'approved'}, {sort: {postDate:-1}})
		    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
		    	};
		    	return templateData;
		    } else if (user){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		//socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
		    		socialPosts: socialPosts.find({ $and: [{postStatus: 'approved'},{postEventName: {$in: RolesList}}]}, {sort: {postDate:-1}})
		    	};
		    	return templateData;
		    }
  		},
  		fastRender: true
    }),
    this.route('deleted', {
      	path: '/deleted',
      	controller: PreloadController,
      	template: 'socialPostsListIonic',
    	onBeforeAction: function () {  
    		Session.set('currentTab', 'deleted');                                                                           
       		//Session.set('court', this.params._id);
       		this.next();                                                               
    	},
      data: function() {
      	RolesList = Roles.getRolesForUser(Meteor.userId());
      	var user = Meteor.user();
	      	if (user && Roles.userIsInRole(user, ['admin'])){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		socialPosts: socialPosts.find({postStatus: 'deleted'}, {sort: {postDate:-1}})
		    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
		    	};
		    	return templateData;
		    } else if (user){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		//socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
		    		socialPosts: socialPosts.find({ $and: [{postStatus: 'deleted'},{postEventName: {$in: RolesList}}]}, {sort: {postDate:-1}})
		    	};
		    	return templateData;
		    }
  		},
  		fastRender: true
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
      	RolesList = Roles.getRolesForUser(Meteor.userId());
      		var user = Meteor.user();
	      	if (user && Roles.userIsInRole(user, ['admin'])){
	      		console.log('user is valid so fetching results as admin');
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		socialPosts: socialPosts.find({postStatus: 'new'}, {sort: {postDate:-1}})
		    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
		    	};
		    	return templateData;
		    } else if (user){
		    	console.log('so not an admin user so fetching based on roles');
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		//socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
		    		socialPosts: socialPosts.find({ $and: [{postStatus: 'new'},{postEventName: {$in: RolesList}}]}, {sort: {postDate:-1}})
		    	};
		    	return templateData;
		    }
  		},
  		fastRender: true
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
      	RolesList = Roles.getRolesForUser(Meteor.userId());
      	var user = Meteor.user();
	      	if (user && Roles.userIsInRole(user, ['admin'])){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		socialPosts: socialPosts.find({postStatus: 'approved'}, {sort: {postDate:-1}})
		    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
		    	};
		    	return templateData;
		    } else if (user){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		//socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
		    		socialPosts: socialPosts.find({ $and: [{postStatus: 'approved'},{postEventName: {$in: RolesList}}]}, {sort: {postDate:-1}})
		    	};
		    	return templateData;
		    }
  		},
  		fastRender: true
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
      	RolesList = Roles.getRolesForUser(Meteor.userId());
      		var user = Meteor.user();
	      	if (user && Roles.userIsInRole(user, ['admin'])){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		socialPosts: socialPosts.find({postStatus: 'deleted'}, {sort: {postDate:-1}})
		    		//socialPosts: socialPosts.find({ $and: [{postStatus: this.params.type},{postEventName: {$in: RolesList}}]}, {postDate: -1}, { limit: limit })
		    	};
		    	return templateData;
		    } else if (user){
		    	templateData = { 
		    		//socialPosts: socialPosts.find({postStatus: this.params.type})
		    		//socialPosts: socialPosts.find({postStatus: 'deleted'}, {postDate: -1})
		    		socialPosts: socialPosts.find({ $and: [{postStatus: 'deleted'},{postEventName: {$in: RolesList}}]}, {sort: {postDate:-1}})
		    	};
		    	return templateData;
		    }
  		},
  		fastRender: true
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