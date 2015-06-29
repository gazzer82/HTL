postsFeedExport = function (postID) {
    var xmlBuilder = Meteor.npmRequire('xmlbuilder'); //needed to use xmlbuilder
    var feed = xmlBuilder.create('array');
    socialPosts.find({ $and: [{postStatus: 'approved'},{postEventID: postID}]}).forEach(function(postData) {
        var post = feed.ele('dict');
        post.ele('objectID', postData._id);
        post.ele('postID', postData.postID);        
		post.ele('approvedDate', postData.postStatusDate);
		post.ele('avatarUrl', postData.postUserImageURL);
		if(postData.postHasImage){
			post.ele('hasImage', postData.postHasImage);
			post.ele('imagePreviewURL', postData.postImagePreviewURL);
			post.ele('imageURL', postData.postImageURL);
		} else {
			post.ele('hasImage', false);
		}
		if (postData.postHasVideo){
			post.ele('hasVideo', postData.postHasVideo);
			post.ele('videoURL', postData.postVideoURL);
			post.ele('videoPreviewURL', postData.postVideoPreviewURL);
		} else {
			post.ele('hasVideo', false);
		}
		post.ele('objectType', postData.postType);
		post.ele('postDate', postData.postDate);
		post.ele('profanity', postData.postProfane);
		post.ele('realName', postData.postUserRealName);
		post.ele('userName', postData.postUserName);
		post.ele('text', postData.postText);
    });
    return feed.end({pretty: true});
};