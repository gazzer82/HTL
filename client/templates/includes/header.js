Template.header.events({
  'click .newPosts' : function (e) {
    e.preventDefault();
    //Session.set('postFilter', 'new');
    Router.go('/new');
  },
    'click .approvedPosts' : function (e) {
    e.preventDefault();
    //Session.set('postFilter', 'approved');
    Router.go('/approved');
  },
    'click .deletedPosts' : function (e) {
    e.preventDefault();
    //Session.set('postFilter', 'deleted');
    Router.go('/deleted');
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