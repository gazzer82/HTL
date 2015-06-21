socialPosts = new Mongo.Collection('socialposts');

var Schemas = {};

Schemas.socialPost = new SimpleSchema({
    postText: {
        type: String,
        label: "Text",
        max: 200
    },
    postStaus: {
        type: String,
        label: "Current Status"
    },
    postDate: {
        type: Date,
        label: "Post Date"
    },
    postScanned: {
        type: Boolean,
        label: "Post scanned for profanity",
        optional: true
    },
    postScheduleDate: {
        type: Date,
        label: "Post Scheduled date",
        optional: true
    },
    postUserImageURL: {
        type: String,
        label: "User avatar URL",
        optional: true
    },
    postUserRealName: {
        type: String,
        label: "Users Real Name",
        optional: true
    },
    postUserName: {
        type: String,
        label: "Username",
        optional: true
    },
    postUpdateUser: {
        type: String,
        label: "Post last mondified by.",
        optional: true
    },
    postStatusDate: {
        type: Date,
        label: "Date of last change of status."
    },
    postImagePreviewURL: {
        type: String,
        label: "Image Preview URL",
        optional: true
    },
    postImageURL: {
        type: String,
        label: "Image URL",
        optional: true
    },
    postVideoPreviewURL: {
        type: String,
        label: "Video Preview URL",
        optional: true
    },
    postVideoURL: {
        type: String,
        label: "Video URL",
        optional: true
    }
});

Meteor.methods({
	socialPostsInsert: function(post) {
		var postId = socialPosts.insert(post);
		return {
			_id: postId
		};
	}
});

validatesocialPosts = function (post) {
	var errors = {};
	if (!post.title)
		errors.title = "Please fill in a headline";
	if (!post.url)
		errors.url = "Please fill in a URL";
	return errors;
};

socialPosts.attachSchema(Schemas.socialPosts);
