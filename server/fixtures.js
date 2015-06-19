if (HTLEvents.find().count() === 0) {
      console.log("No events found, inserting defaults.");
      HTLEvents.insert({
          eventName: "macmillan",
          twitterEnabled: true,
          instagramEnabled: false,
          vineEnabled: false,
          fetchCount: 2,
          enabled: false,
          searchTerms: [
            {
              term: "badger",
              latestTwitter: 0,
              latestInstagram: 0,
              latestVine: 0,
            },
            {
              term: "freedom",
              latestTwitter: 0,
              latestInstagram: 0,
              latestVine: 0,
            }
          ]
    });
}

if(Meteor.users.find().count() === 0) {
    var options = {
      username: 'admin', 
      password: 'vertbaudet', 
      email: 'admin@htl.com'
    };
    Accounts.createUser(options);
}