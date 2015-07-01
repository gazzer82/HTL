AdminConfig = { 
adminEmails: ['	admin@htl.com'], 
fromEmail: 'admin@htl.com',
collections: 
	{ 
		socialPosts: {
			icon: 'book',
			label: 'Posts',
	            tableColumns: [
	            	{label: 'User', name: 'postUserName'},
	            	{label: 'Network', name: 'postType'},
	            	{label: 'Status', name: 'postStatus'},
	            	{label: 'Profanity', name: 'postProfane'},
					{label: 'Date', name: 'postDate'},
					{label: 'Text', name: 'postText'}
	            ]
		}, 
		HTLEvents: {
			    icon: 'file',
	            label: 'Events',
	            tableColumns: [
	            	{label: 'Event Name', name: 'eventName'},
	            	{label: 'Event Enabled', name: 'enabled'},
	            	{label: 'Twitter Enabled', name: 'twitterEnabled'},
					{label: 'Instagram Enabled', name: 'instagramEnabled'},
					{label: 'Vine Enabled', name: 'vineEnabled'}
	            ]
		},
		Profanity: {
			icoon: 'file',
			label: 'Filters',
			tableColumns: [
				{label: 'Linked Event', name: 'name'}
			]

		},
    	'Meteor.roles': {
    		icon: 'file',
  			label: 'Roles', // Change the label on the dashboard button
 			 tableColumns: [
    			{label: 'Name', name: 'name'}
  			]
  		}
	} 
};