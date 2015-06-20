AdminConfig = { 
adminEmails: ['	admin@htl.com'], 
collections: 
	{ 
	socialPosts: {
		icon: 'book',
            tableColumns: [
            	{label: 'User', name: 'postUserName'},
            	{label: 'Network', name: 'postType'},
            	{label: 'Status', name: 'postStatus'},
				{label: 'Date', name: 'postDate'},
				{label: 'Text', name: 'postText'}
            ]
	}, 
	HTLEvents: {
		    icon: 'file',
            //omitFields: ['updatedAt']
            tableColumns: [
            	{label: 'Event Name', name: 'postText'},
            	{label: 'Event Enabled', name: 'enabled'},
            	{label: 'Twitter Enabled', name: 'twitterEnabled'},
				{label: 'Instagram Enabled', name: 'instagramEnabled'},
				{label: 'Vine Enabled', name: 'vineEnabled'}
            ]
	} 
	} 
};