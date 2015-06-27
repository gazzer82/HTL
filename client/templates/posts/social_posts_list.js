Meteor.startup(function () {
  if(Meteor.isCordova){
    StatusBar.hide();
  }
});
/*
Template.socialPostsIonic.helpers({
  pageTitle: function() { return Session.get('pageTitle'); },
  environment: function() {
    if (Meteor.isCordova){
      $('head').append('<link rel="stylesheet" href="ionic.css" type="text/css">');
      $('head').append('<link rel="stylesheet" href="ionicons.css" type="text/css">');
      return "socialPostsListIonic";
    } else {
      return "socialPostsListWeb";
      //return "socialPostsListIonic";
    }
    }
});

Template.socialPostsListWeb.helpers({
  	socialPosts: function() {
	  	//return socialPosts.find({}, {sort: {postDate: -1}});
	  	return socialPosts.find();
  	},
  	moreResults: function() {
    // If, once the subscription is ready, we have less rows than we
    // asked for, we've got all the rows in the collection.
	    if ((socialPosts.find().count() < Session.get("itemsLimit"))){
	    	return false;
	    } else {
	    	return true;
	    }
	}
});

Template.socialPostsListIonic.helpers({
    socialPosts: function() {
      //return socialPosts.find({}, {sort: {postDate: -1}});
      return socialPosts.find();
    },
    moreResults: function() {
    // If, once the subscription is ready, we have less rows than we
    // asked for, we've got all the rows in the collection.
      if ((socialPosts.find().count() < Session.get("itemsLimit"))){
        return true;
      } else {
        return false;
      }
  }
});

Template.socialPostsListNew.rendered = function () {
  console.log('new list loaded');
  Deps.autorun(function () {
    if (!this.subscription.ready()) {
      console.log('waiting for load');
      if (Meteor.isCordova){
        IonLoading.show();
      }
    } else {
      console.log('finished loading');
      if (Meteor.isCordova){
        IonLoading.hide();
      }
    }
  })
};

Template.socialPostsListApproved.rendered = function () {
  console.log('new list loaded');
  Deps.autorun(function () {
    if (!this.subscription.ready()) {
      console.log('waiting for load');
      if (Meteor.isCordova){
        IonLoading.show();
      }
    } else {
      console.log('finished loading');
      if (Meteor.isCordova){
        IonLoading.hide();
      }
    }
  })
};

Template.socialPostsListDeleted.rendered = function () {
  console.log('new list loaded');
  Deps.autorun(function () {
    if (!this.subscription.ready()) {
      console.log('waiting for load');
      if (Meteor.isCordova){
        IonLoading.show();
      }
    } else {
      console.log('finished loading');
      if (Meteor.isCordova){
        IonLoading.hide();
      }
    }
  })
};*/

var ITEMS_INCREMENT = 10;

/*Template.socialPostsListNew.rendered = function () {
    Session.set('currentTab', 'socialPostsListNew');
    Session.set('filter', 'new');
    //$('.bar-header').hide();
    //$('.content').removeClass('has-header');
};

Template.socialPostsListApproved.rendered = function () {
    Session.set('currentTab', 'socialPostsListApproved');
    Session.set('filter', 'approved');
    //$('.bar-header').hide();
    //$('.content').removeClass('has-header');
};

Template.socialPostsListDeleted.rendered = function () {
    Session.set('currentTab', 'socialPostsListDeleted');
    Session.set('filter', 'deleted');
    //$('.bar-header').hide();
    //$('.content').removeClass('has-header');
};

Template.socialPostsListNew.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  Session.set('currentTab', 'socialPostsListNew');
  Session.set('filter', 'new');
  //RolesList = Roles.getRolesForUser(Meteor.userId());
  //this.subscribe('socialPosts', Session.get('filter'), Session.get('itemsLimit'), RolesList);
});

Template.socialPostsListApproved.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  Session.set('currentTab', 'socialPostsListNew');
  Session.set('filter', 'approved');
  //RolesList = Roles.getRolesForUser(Meteor.userId());
  //this.subscribe('socialPosts', Session.get('filter'), Session.get('itemsLimit'), RolesList);
});

Template.socialPostsListDeleted.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  Session.set('currentTab', 'socialPostsListNew');
  Session.set('filter', 'deleted');
  //RolesList = Roles.getRolesForUser(Meteor.userId());
  //this.subscribe('socialPosts', Session.get('filter'), Session.get('itemsLimit'), RolesList);
});*/

/*Template.socialPostsListWeb.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  //Deps.autorun(function() {
    Session.setDefault('itemsLimit', ITEMS_INCREMENT);
    RolesList = Roles.getRolesForUser(Meteor.userId());
    this.subscribe('socialPosts', 'new', 10, RolesList);
  //});
});*/

/*Template.socialPostsListIonic.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  //Deps.autorun(function() {
    //Session.setDefault('itemsLimit', ITEMS_INCREMENT);
    //RolesList = Roles.getRolesForUser(Meteor.userId());
    //this.subscribe('socialPosts', Session.get('filter'), Session.get('itemsLimit'), RolesList);
    console.log('appending ionic stylesheets');
    $('head').append('<link rel="stylesheet" href="ionic.css" type="text/css">');
    $('head').append('<link rel="stylesheet" href="ionicons.css" type="text/css">');
  //});
});*/

Template.socialPostsListIonic.rendered = function () {
    console.log('appending ionic stylesheets');
    $('head').append('<link rel="stylesheet" href="ionic.css" type="text/css">');
    $('head').append('<link rel="stylesheet" href="ionicons.css" type="text/css">');
};

/*Template.socialPostsListWeb.helpers({
  socialPosts: function() {
    return socialPosts.find();
  }
});

Template.socialPostsListIonic.helpers({
  socialPosts: function() {
    return socialPosts.find();
  }
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height();
    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("itemsLimit",
                Session.get("itemsLimit") + ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }        
}
 
// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);

if (!Session.get('postFilter')){
	Session.set('postFilter', 'new');
}

var ITEMS_INCREMENT = 10;
Session.setDefault('itemsLimit', ITEMS_INCREMENT);

/*Deps.autorun(function() {
	//Meteor.subscribe('socialPosts', Session.get('itemsLimit'), filter);
	RolesList = Roles.getRolesForUser(Meteor.userId());
  var filter = Session.get('postFilter');
  Meteor.subscribe('socialPosts', Session.get('filter'), Session.get('itemsLimit'), RolesList);
});*/