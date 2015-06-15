socialfetch = {
	//collection: new Mongo.Collection(null),

	//throw: function(message) {
	//	Errors.collection.insert({message: message, seen: false})
	//},

	fetch: function(defaultData, callback) {
		var returnData = {}
		var errors = []
		var callbackTarget = 0;
		var callbackCount = 0;
		if (defaultData.twitterEnabled){
			callbackTarget += defaultData.searchTerms.length
		}
		if (defaultData.instagramEnabled){
			callbackTarget += defaultData.searchTerms.length
		}
		if (defaultData.vineEnabled){
			callbackTarget += defaultData.searchTerms.length
		}
		for (term in defaultData.searchTerms) {
			termObject = defaultData.searchTerms[term]
			if (defaultData.twitterEnabled) {
				fetchIndividual('twitter', termObject.term, defaultData.fetchCount, termObject.latestTwitter, function(err, data) {
					callbackCount ++;
					console.log("callbackCount = " + callbackCount);
					console.log("callbackTarget = " + callbackTarget);
					if (err) {
						errors.push(err)
					} else {
						returnData.push(data)
					}
					if (callbackCount == callbackTarget){
						console.log("all done fetching so calling callback");
						callback(err, returnData);
					}
					//console.log(returnData);
				});
			}
			if (defaultData.instagramEnabled) {
				fetchIndividual('instagram', termObject.term, defaultData.fetchCount, termObject.latestInstagram, function(err, data) {
					callbackCount ++;
					console.log("callbackCount = " + callbackCount);
					console.log("callbackTarget = " + callbackTarget);
					if (err) {
						errors.push(err)
					} else {
						returnData.push(data)
					}
					if (callbackCount == callbackTarget){
						console.log("all done fetching so calling callback");
						callback(err, returnData);
					}
					//console.log(returnData);
				});
			}
			if (defaultData.vineEnabled) {
				fetchIndividual('vine', termObject.term, defaultData.fetchCount, termObject.latestVine, function(err, data) {
					callbackCount ++;
					console.log("callbackCount = " + callbackCount);
					console.log("callbackTarget = " + callbackTarget);
					if (err) {
						errors.push(err)
					} else {
						returnData.push(data)
					}
					if (callbackCount == callbackTarget){
						console.log("all done fetching so calling callback");
						callback(err, returnData);
					}
					//console.log(returnData);
				});
			}
			//console.log(defaultData.searchTerms[term].term);
		}
	}
};



fetchIndividual = function(type, searchTerm, fetchCount, latestID, callback) {
		//var Twitter = require('twitter_fetch.js')
		//var Instagram = require('instagram_fetch.js')
		//var Vine = require('vine_fetch.js')

		var util = Npm.require('util');
		var instagramClientID = '045e0562dee344e3b8e41f7a274221b4'
		var twitterBearerToken = 'AAAAAAAAAAAAAAAAAAAAAHNXewAAAAAAKfB%2BV%2Fa58coGj26sfa89INQxi8k%3DXA9dqNpHszjkLU20xrg1ImelF6CE5kTgAPhTMRzZQVBudnKD9c'
		switch (type) {
		    case undefined :
		        console.log("No social network type specified");
		        break;
		    case "":
		        console.log("No social network type specified");
		        break;
		    case 'twitter':
		            var twitterVals = {
		              bearer_token: twitterBearerToken,
		              searchTerm: searchTerm,
		              fetchCount: fetchCount,
		              latestID: latestID
		            }
		            twitterfetch(twitterVals, function(err, returnValue) {
		              if(err){
		                console.log('We have an errror' + util.inspect(err, false, null));
		              } else {
		                console.log('All went fine');
		              }
		              callback (err, returnValue);
		            });
		        break;
		    case 'instagram':
		            var instagramVals = {
		              searchTerm: searchTerm,
		              fetchCount: fetchCount,
		              latestID: latestID,
		              clientID: instagramClientID
		            }
		            instagramfetch(instagramVals, function(err, returnValue) {
		              if(err){
		                console.log('We have an errror');
		              } else {
		                console.log('All went fine');
		              }
		              callback (err, returnValue);
		            });
		        break;
		    case 'vine':
		              var vineVals = {
		              searchTerm: searchTerm,
		              latestID: latestID
		            }
		            vinefetch(vineVals, function(err, returnValue) {
		              if(err){
		                console.log('We have an error - ' + util.inspect(err, false, null));
		              } else {
		                console.log('All went fine');
		              }
		              callback (err, returnValue);
		            });
		        break;
		    default:
		    	console.log("No know social network of type " + req.body.type);
		        err = "No know social network of type " + req.body.type
		        callback (err, returnValue);
		  }
},

//twitter

//Fetches and retursn an object containing twitter posts for a certain search term
twitterfetch = function(input, callback){
	//Import NPM's
	var Twitter = Npm.require('twitter');
	var OAuth2 = Npm.require('OAuth').OAuth2;
	var https = Npm.require('https');
	var util = Npm.require('util');


	    var posts = []
	    var client = new Twitter({
	      consumer_key: input.consumer_key,
	      consumer_secret: input.consumer_secret,
	      bearer_token: input.bearer_token
	    });
	    var params = {q: input.searchTerm, count: input.fetchCount, since_id: input.latestID};
	    console.log("Searching twitter for " + input.searchTerm);
	    client.get('/search/tweets', params, function(error, body, response){
	      if (!error) {
	      //var error = undefined;
	      var returnArr = [];
	      var postsArr = [];
	      var valuesArr = [];
	      var postScanned = false;
	      var d = new Date();
	      var n = d.toISOString();
	      var latestIDValue = 0
	      if (input.latestID > 0){
	        var latestIDValue = input.latestID;
	      }
	      for (var i in body.statuses) {

	            var postHasVideo = 'false';
	            var postHasImage = 'false';
	            var postImagePreviewURL = '';
	            var postImageURL = '';
	            var postVideoPreviewURL = '';
	            var postVideoURL = '';

	            if (body.statuses[i].id > input.latestID){
	              since_id_return = body.statuses[i].id;
	            }

	            if (body.statuses[i].id > latestIDValue){
	              latestIDValue = body.statuses[i].id;
	            }

	            if (body.statuses[i].entities.media) {
	              if (body.statuses[i].entities.media[0].type == 'photo') {
	                  postHasImage = 'true';
	                  postImagePreviewURL = body.statuses[i].entities.media[0].media_url + ':small';
	                  postImageURL = body.statuses[i].entities.media[0].media_url;
	              }

	              if(body.statuses[i].entities.media[0].type == 'video') {
	                  postHasVideo = 'true';
	                  postHasImage = 'true';
	                  postImagePreviewURL = body.statuses[i].entities.media[0].media_url + ':small';
	                  postImageURL = body.statuses[i].entities.media[0].media_url;
	                  postVideoPreviewURL = body.statuses[i].entities.media[0].variants[0].url;

	                  for (var i2 in body.statuses[i].entities.media[0].variants[0]) {
	                    if (body.statuses[i].entities.media[0].variants[i2].content_type == 'video\/mp4') {
	                      postVideoURL = body.statuses[i].entities.media[0].variants[i2].url;
	                    }
	                  }

	                }
	              } else {
	              }

	            postsArr.push({
	              postText: body.statuses[i].text,
	              postID: body.statuses[i].id,
	              postStatus: 'new',
	              postDate: body.statuses[i].created_at,
	              postScanned: postScanned,
	              postScheduleDate: '',
	              postUserImageURL: body.statuses[i].user.profile_image_url,
	              postUserRealName: body.statuses[i].user.name,
	              postUserName: body.statuses[i].user.screen_name,
	              postUpdateUser: '',
	              postType: 'twitter',

	              postStatusDate: n,
	              
	              postHasVideo: postHasVideo,
	              postHasImage: postHasImage,
	              postImagePreviewURL: postImagePreviewURL,
	              postImageURL: postImageURL,
	              postVideoPreviewURL: postVideoPreviewURL,
	              postVideoURL: postVideoURL
	          });
	          
	       }
	       values = {}
	       values.latestID = latestIDValue
	       returnArr.push(postsArr);
	       returnArr.push(values);
	      }
	      console.log(error, returnArr);
	      callback(error, returnArr);
	    });
},

//var request = Npm.require('request');
//var util = Npm.require('util');


instagramfetch = function (input, callback)  {
	var request = Npm.require('request');
	var util = Npm.require('util');
    var postsArr = [];
    var min_tag_id = 0;
    var i3 = 0;
    var searchTerm = "";
    var error;
    if (input.searchTerm){
      var searchTermArray = input.searchTerm.split(" ");
        for (i=0; i < searchTermArray.length; i++){
          searchTerm = searchTerm + searchTermArray[i];
        }
    }

      var tempURL = 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?client_id=' + input.clientID;

      if (input.fetchCount) {
            tempURL = tempURL + '&count=' + input.fetchCount;
      }

      if (input.latestID) {
            tempURL = tempURL + '&min_tag_id=' + input.latestID;
      }

      console.log("Searching instagram for " + searchTerm);

        request.get({
        url: tempURL,
        json: true,
      },

      function(err, response, body) {

        if (err) {
          //return exits.error(err);
          //callback(err);
          error = err;
        } else if (response.statusCode > 299 || response.statusCode < 200) {
          //return exits.error(response.statusCode);
          //callback('Error: ' + response.statusCode);
          error = response;
        } else {
        //var postsArr = [];
        var d = new Date();
        var n = d.toISOString();
          if (body.pagination.min_tag_id > input.latestID || !input.latestID ){
            for (var i in body.data) {

              var postHasVideo = false;
              var postHasImage = false;
              var postImagePreviewURL = '';
              var postImageURL = '';
              var postVideoPreviewURL = '';
              var postVideoURL = '';
              var postScanned = false;

              postsArr.push({
                postID: body.data[i].id,
                postText: body.data[i].caption.text,
                postStatus: 'new',
                postDate: body.data[i].created_time,
                postScheduleDate: '',
                postUserImageURL: body.data[i].user.profile_picture,
                postUserRealName: body.data[i].user.full_name,
                postUserName: body.data[i].user.username,
                postUpdateUser: '',
                postType: 'instagram',

                postStatusDate: n,
                    
                postHasVideo: postHasVideo,
                postHasImage: true,
                postImagePreviewURL: body.data[i].images.low_resolution.url,
                postImageURL: body.data[i].images.standard_resolution.url,
                postVideoPreviewURL: postVideoPreviewURL,
                postVideoURL: postVideoURL

              });
            }
          }
        var values = {}
        if (postsArr.length > 1){
          values.latestID = body.pagination.min_tag_id
        } else {
          values.latestID = input.latestID
        }
        var returnArr = [];
        returnArr.push(postsArr);
        returnArr.push(values);
    }
    callback(error, returnArr);
  });
},

//Vine fetching

//instagram_fetch.js
//Fetches and retursn an object containing instagram posts for a certain search term

//Import request framework


vinefetch = function (input, callback)  {
	var request = Npm.require('request');
	var Twitter = Npm.require('twitter');
	//var Twitter = require('../../node-modules/node-twitter/lib/twitter.js');
	var OAuth2 = Npm.require('OAuth').OAuth2;
	var https = Npm.require('https');

    var postsArr = [];
    var min_tag_id = 0;
    var searchTerm = "";
    var error;
    if (input.searchTerm){
      var searchTermArray = input.searchTerm.split(" ");
        for (i=0; i < searchTermArray.length; i++){
          searchTerm = searchTerm + searchTermArray[i];
        }
    }

      var tempURL = 'https://api.vineapp.com/timelines/tags/' + searchTerm
        request.get({
          url: tempURL,
          json: true,
      },

      console.log("Searching Vine for " + searchTerm),

      function(err, response, body) {
        var latestIDValue = 0;
        if (input.latestID > 0){
          latestIDValue = input.latestID;
        }
        if (err) {
          //return exits.error(err);
          error = err;
        }
        if (response.statusCode > 299 || response.statusCode < 200) {
          //return exits.error(response.statusCode);
          error = response;
        } else {
        //var postsArr = [];
        var d = new Date();
        var n = d.toISOString();
          //callback(response);
          if (body.data.records){
              for (var i in body.data.records) {
                if (body.data.records[i].postId > input.latestID || !input.latestID){
                  if (body.data.records[i].postId > latestIDValue){
                    latestIDValue = body.data.records[i].postId;
                  }
                  var postHasVideo = true;
                  var postHasImage = false;
                  var postImagePreviewURL = '';
                  var postImageURL = '';
                  var postVideoPreviewURL = '';
                  var postVideoURL = '';
                  var postScanned = false;
                  postsArr.push({
                    postID: body.data.records[i].postId,
                    postText: body.data.records[i].description,
                    postStatus: 'new',
                    postDate: body.data.records[i].created,
                    postScanned: postScanned,
                    postScheduleDate: '',
                    postUserImageURL: body.data.records[i].avatarUrl,
                    postUserRealName: body.data.records[i].username,
                    postUserName: body.data.records[i].username,
                    postUpdateUser: '',
                    postType: 'instagram',

                    postStatusDate: n,
                        
                    postImagePreviewURL: body.data.records[i].thumbnailUrl,
                    postImageURL: body.data.records[i].thumbnailUrl,
                    postVideoPreviewURL: body.data.records[i].videoLowURL,
                    postVideoURL: body.data.records[i].videoUrl
                  });
                }
            }
          } else {
            error = 'No Records Found';
          }
        var values = {}
        var returnArr = [];
        returnArr.push(postsArr);
        returnArr.push(values);
    }
    callback(error, returnArr);
  });
}
