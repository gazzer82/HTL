fetchErrors = new Mongo.Collection('fetcherrors');

/*fetchErrors.allow({
	update: function(userId, post) {return ownsDocument(userId, post); },
	remove: function(userId, post) {return ownsDocument(userId, post); },
});

fetchErrors.deny({
	update: function(userId, post, fieldNames) {
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

fetchErrors.deny({
	update: function(userId, post, fieldNames) {
		var errors = validatePost(modifier.$set);
		return errors.title || errors.url;
	}
});*/

Meteor.methods({
	fetchErrorsInsert: function(error) {
		/*check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var errors = validatePost(postAttributes);
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});*/
		var errorID = fetchErrors.insert(error);
		return {
			_id: postId
		};
	}
});

/*validatesocialPosts = function (post) {
	var errors = {};
	if (!post.title)
		errors.title = "Please fill in a headline";
	if (!post.url)
		errors.url = "Please fill in a URL";
	return errors;
}*/
