profanity = {
	fetch: function(text, event, callback) {
		var error;
		var profanity = Npm.require('profanity-util');
		var additonalWords = Profanity.findOne({name:event});
		var additionalWordsArray = [];
		for (var i in additonalWords.filterWord){
			additionalWordsArray.push(additonalWords.filterWord[i].word);
		}
		var results = profanity.check(text, additionalWordsArray);
		callback(error, results);
	}
};
