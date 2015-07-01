Template.adminTools.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  Deps.autorun(function() {
    Meteor.subscribe('HTLEvents');
  });
});

Template.adminTools.onRendered(function () {
	$(".selectpicker").select2({placeholder: "Select an event", allowClear: false, width: "100%"});
});

Template.adminTools.helpers({
  	HTLEvents: function() {
    	return HTLEvents.find();
  	},
  	CurrentEvent: function() {
	  	if (Session.get("adminSelectedEvents")){
	  		return Session.get("adminSelectedEvents");
	  	} else {
	  		return 'Select Events';
  	}
  }
});

Template.adminTools.events({
	'click .eventSelect' : function (e) {
  		e.preventDefault();
  	},
  	'click .resetTwitter' : function (e) {
  		e.preventDefault();
  	},
  	'click .resetInstagram' : function (e) {
  		e.preventDefault();
  	},
  	'click .resetVine' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteTwitter' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteInstagram' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteVine' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteNew' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteApproved' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteDeleted' : function (e) {
  		e.preventDefault();
  	},
  	'click .deleteAll' : function (e) {
  		e.preventDefault();
  	},
  	'change select': function(e){
  		console.dir(e.target.selectedOptions[0].innerText);
        e.preventDefault();
         Session.set("adminSelectedEvent", e.target.selectedOptions[0].innerText);
     }
});