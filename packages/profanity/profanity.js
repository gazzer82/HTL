profanity = {
	fetch: function(text, callback) {
		var error;
		var profanity = Npm.require('profanity-util');
		var results = profanity.check(text);
		callback(error, results);
	}
};
