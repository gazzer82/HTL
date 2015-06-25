Template.profile.rendered = function () {
    Session.set('currentTab', 'profile');
    //$('.bar-header').hide();
    //$('.content').removeClass('has-header');
};

Template.profile.onCreated(function () {
    $('head').append('<link rel="stylesheet" href="ionic.css" type="text/css">');
    $('head').append('<link rel="stylesheet" href="ionicons.css" type="text/css">');
});

Template.profile.events({
  'click .logout' : function (e) {
  	e.preventDefault();
	Meteor.logout();
	Router.go('socialPostsListNew');
  }
});