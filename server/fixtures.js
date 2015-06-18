if (HTLEvents.find().count() === 0) {
      console.log("No events found, inserting defaults.");
      HTLEvents.insert({
          eventName: "macmillan",
          twitterEnabled: true,
          instagramEnabled: false,
          vineEnabled: false,
          fetchCount: 2,
          enabled: true,
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