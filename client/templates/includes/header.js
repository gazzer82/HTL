Template.header.events({
  'click .newPosts' : function (e) {
    e.preventDefault();
    Session.set('postFilter', 'new');
  },
    'click .approvedPosts' : function (e) {
    e.preventDefault();
    Session.set('postFilter', 'approved');
  },
    'click .deletedPosts' : function (e) {
    e.preventDefault();
    Session.set('postFilter', 'deleted');
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