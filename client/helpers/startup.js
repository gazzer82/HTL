Meteor.startup(function() {
    AdminDashboard.addSidebarItem('New User', AdminDashboard.path('/Users/new'), { icon: 'plus' });
    AdminDashboard.addSidebarItem('Admin Tools', AdminDashboard.path('adminTools'), { icon: 'plus' });
});