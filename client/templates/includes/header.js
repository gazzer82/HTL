Template.header.events({
  'click .newPosts' : function (e) {
    e.preventDefault();
    //Session.set('postFilter', 'new');
    Router.go('socialPostsListNew');
  },
    'click .approvedPosts' : function (e) {
    e.preventDefault();
    //Session.set('postFilter', 'approved');
    Router.go('socialPostsListApproved');
  },
    'click .deletedPosts' : function (e) {
    e.preventDefault();
    //Session.set('postFilter', 'deleted');
    Router.go('socialPostsListDeleted');
  }
});

Template.header.helpers({
  menuActive: function(item) {
    if (item == Session.get('postFilter')){
      return true;
    } else {
      return false;
    }
  }
});