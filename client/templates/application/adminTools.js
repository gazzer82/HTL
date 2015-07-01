Template.adminTools.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  Deps.autorun(function() {
    Meteor.subscribe('HTLEvents');
  });
});

Template.adminTools.onRendered(function () {
	$(".eventSelect").select2({placeholder: "Select an event", allowClear: false, width: "100%", minimumResultsForSearch: Infinity});
	$(".actionSelect").select2({placeholder: "Select an action", allowClear: false, width: "80%", minimumResultsForSearch: Infinity});
});

Template.adminTools.helpers({
  	HTLEvents: function() {
    	return HTLEvents.find();
  	}
});

Template.adminTools.events({
	'click .eventSelect' : function (e) {
  		e.preventDefault();
  	},
  	'click .runAction' : function (e) {
  		e.preventDefault();
  		if (Session.get("adminSelectedEvent") && Session.get("adminSelectedAction")){
  			Modal.show('eventModal');
  		} else {
  			Modal.show('noEventModal');
  		}
  	},
  	'change select': function(e){
  		e.preventDefault();
  		if (e.target.id == "actionPicker"){
  			console.log("Action Set");
	        Session.set("adminSelectedAction", e.target.selectedOptions[0].value);
	        Session.set("adminSelectedActionPretty", e.target.selectedOptions[0].innerText);
	    } else if (e.target.id == "eventPicker"){
	    	console.log("Event Set");
	    	Session.set("adminSelectedEvent", e.target.selectedOptions[0].innerText);
	    	console.log(e.target.selectedOptions[0]);
	    }
     }
});

Template.eventModal.helpers({
	CurrentEvent: function() {
	  	if (Session.get("adminSelectedEvent")){
	  		return Session.get("adminSelectedEvent");
	  	} else {
	  		return 'Select Events';
  		}
	},
	CurrentAction: function() {
	  	if (Session.get("adminSelectedAction")){
	  		return Session.get("adminSelectedActionPretty");
	  	} else {
	  		return 'Select Action';
  		}
	}
});

Template.eventModal.events({
	'click .btn-run-action' : function (e) {
  		e.preventDefault();
  		console.log('Running Action on Server');
  		Meteor.call('performAdminTask', Session.get("adminSelectedEvent"), Session.get("adminSelectedAction"));
  	}
});















