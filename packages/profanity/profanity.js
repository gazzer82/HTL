profanity = {
	fetch: function(text, event, callback) {
		var error;
		var profanity = Npm.require('profanity-util');
		var additonalWords = Profanity.findOne({name:event});
		var additionalWordsArray = [];
		var results;
		if (additonalWords.filterWord){
			//if (Object.keys(additonalWords.filterWord).length > 0){
				for (var i in additonalWords.filterWord){
					additionalWordsArray.push(additonalWords.filterWord[i].word);
				}
				results = profanity.check(text, additionalWordsArray);
			//}
		} else {
			results = profanity.check(text);
		}
		callback(error, results);
	}
};
