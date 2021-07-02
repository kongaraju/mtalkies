ProfilePic = new FS.Collection("profilePics", {
  stores: [new FS.Store.FileSystem("images", {path: "../../../../../public/.ProfilePics"})]
});

if(Meteor.isServer)
{
	ProfilePic.allow({
		update: function () {
	         // add custom authentication code here
	        return true;
	        },
	  'insert': function () {
	    	// add custom authentication code here
	    	return true;
	  }
	});
}