/*AutoForm.hooks({
  admin_insert: {
    onSuccess: function (formType, result) {
      if (this.template.data.collection._name == 'htlevents'){
        if (!Meteor.roles.findOne({name: this.insertDoc.eventName})){
          console.dir('Couldt find an existing Role with the name ' + this.insertDoc.eventName + ' so creating one.');
          Roles.createRole(this.insertDoc.eventName);
        }
      }
    }
  },
  admin_update: {
    onSuccess: function (formType, result) {
      if (this.template.data.collection._name == 'htlevents'){
        if (!Meteor.roles.findOne({name: this.insertDoc.eventName})){
          console.dir('Couldt find an existing Role with the name ' + this.insertDoc.eventName + ' so creating one.');
          Roles.createRole(this.insertDoc.eventName);
        }
      }
    }
  }
});

var hooksObject = {

  // Called when any submit operation succeeds
  afterRemove: function(id) {
    console.dir('Removed' + id);
  },
};

AutoForm.addHooks(null, hooksObject);*/