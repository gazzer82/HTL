Template.socialPostsList.helpers({
  pageTitle: function() { return Session.get('pageTitle'); },
  environment: function() {
    if (Meteor.isCordova){
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
        return false;
      } else {
        return true;
      }
  }
});

Template.socialPostsListNew.rendered = function () {
  Deps.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  })
};

Template.socialPostsListApproved.rendered = function () {
  Deps.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  })
};

Template.socialPostsListDeleted.rendered = function () {
  Deps.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  })
};

Template.socialPostsListNew.rendered = function () {
    Session.set('currentTab', 'socialPostsListNew');
    Session.set('filter', 'new');
};

Template.socialPostsListApproved.rendered = function () {
    Session.set('currentTab', 'socialPostsListApproved');
    Session.set('filter', 'approved');
};

Template.socialPostsListDeleted.rendered = function () {
    Session.set('currentTab', 'socialPostsListDeleted');
    Session.set('filter', 'deleted');
};

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

var ITEMS_INCREMENT = 20;
Session.setDefault('itemsLimit', ITEMS_INCREMENT);

Deps.autorun(function() {
	//Meteor.subscribe('socialPosts', Session.get('itemsLimit'), filter);
	RolesList = Roles.getRolesForUser(Meteor.userId());
  var filter = Session.get('postFilter');
  Meteor.subscribe('socialPosts', Session.get('filter'), Session.get('itemsLimit'), RolesList);
});