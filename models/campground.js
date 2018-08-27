var mongoose = require("mongoose"),
	Comment  = require("./comment"),
	User     = require("./user");
//Creating the schema when a user sumbmits a new campground and applying it to our database
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[
    	{
    	type:mongoose.Schema.Types.ObjectId,
    	ref:"Comment"
    	}
    ],
    author:{
    	id:{
    		type:mongoose.Schema.Types.ObjectId,
    		ref:"user"
    	},
    	username:String
    },
    price:String
});


module.exports =mongoose.model("Campground",campgroundSchema);
