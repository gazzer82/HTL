Template.socialPostsList.helpers({
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
  	Meteor.subscribe('socialPosts', filter, Session.get('itemsLimit'), RolesList);
});