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
      console.log('Its not the same');
      return true;
    } else {
      console.log('It is the same');
      return false;
    }
  }
});