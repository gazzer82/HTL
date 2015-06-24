Template.postItem.helpers({
	hasImageCall: function() {
    	if (this.postHasImage === true){
      		return true;
    	} else {
      		return false;
    	}
  	},
  	hasVideoCall: function() {
    	if (this.postHasVideo === true){
      		return true;
    	} else {
      		return false;
    	}
  	},
    postProfane: function() {
      if (this.postProfane === true){
          return true;
      } else {
          return false;
      }
    }
});

Template.postItem.events({
  'click .approvePost' : function (e) {
  	e.preventDefault();
    Meteor.call('approvePost', this._id);
  },
    'click .deletePost' : function (e) {
    e.preventDefault();
    Meteor.call('deletePost', this._id);
  }
});

Meteor.startup(function() {
      Meteor.subscribe('htlevents');
});