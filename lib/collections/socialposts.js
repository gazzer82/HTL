socialPosts = new Mongo.Collection('socialposts');

socialPosts.allow({
    update: function(userId, role) {
        var loggedInUser = Meteor.user();
        if (loggedInUser) {
            return true;
        }
    },
    remove: function(userId, role) {
        var loggedInUser = Meteor.user();
        if (loggedInUser) {
            return true;
        }
    },
    insert: function(userId, role) {
        var loggedInUser = Meteor.user();
        if (loggedInUser) {
            return true;
        }
    }
});

var Schemas = {};

Schemas.socialPost = new SimpleSchema({
    postID: {
        type: String,
        label: "Post ID",
        autoform: {
            readonly: true,
        }
    },
    postEventID: {
        type: String,
        label: "ID of event this post belongs to.",        
        autoform: {
            readonly: true,
        }
    },
    postEventName: {
        type: String,
        label: "Name of events this post belongs to.",
        autoform: {
            readonly: true,
        }
    },
    postText: {
        type: String,
        label: "Post Text",
        max: 400,
        autoform: {
            readonly: true,
        }
    },
    postStatus: {
        type: String,
        label: "Current Status"
    },
    postType: {
        type: String,
        label: "Post Type",
        autoform: {
            readonly: true,
        }
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
        optional: true,
        autoform: {
            readonly: true,
        }
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
        optional: true,
        autoform: {
            readonly: true,
        }
    },
    postStatusDate: {
        type: Date,
        label: "Date of last change of status.",
        autoform: {
            readonly: true,
        }
    },
    postHasImage: {
        type: Boolean,
        label: "Post has Image",
        optional: true,
        autoform: {
            readonly: true,
        }
    },
    postImagePreviewURL: {
        type: String,
        label: "Image Preview URL",
        optional: true,
        autoform: {
            readonly: true,
        }
    },
    postImageURL: {
        type: String,
        label: "Image URL",
        optional: true,
        autoform: {
            readonly: true,
        }
    },
    postHasVideo: {
        type: Boolean,
        label: "Post Has Video",
        optional: true,
        autoform: {
            readonly: true,
        }
    },
    postVideoPreviewURL: {
        type: String,
        label: "Video Preview URL",
        optional: true,
        autoform: {
            readonly: true,
        }
    },
    postVideoURL: {
        type: String,
        label: "Video URL",
        optional: true,
        autoform: {
            readonly: true,
        }
    }
});

Meteor.methods({
	socialPostsInsert: function(post) {
	socialPosts.insert(post, function(error, result) {
            if (error) {
                throw error;
            }
        });
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

socialPosts.attachSchema(Schemas.socialPost);
