var Campground 		= require("../models/campground"),
	Comment 		= require("../models/comment");

//all middlewares go in here

middlewareObject={};

//middleware for checking if the user is logged in
middlewareObject.isLoggedIn = function (req,res,next){
								    if (req.isAuthenticated()) {
								        next();
								    } else {
								    	req.flash("error","You need to be logged in to do that!");
								        res.redirect("/login");
								    }
								};

//middleware to check if it's the author of the post
middlewareObject.isCampgroundAuthor = function (req,res,next){
										    //checks if the user is logged in at all
										    if (req.isAuthenticated()) {
										        //checks if the campground exists at all
										        //nga cfr po marr vesh kte e bejme per te kapur...
										        //id-ne e autorit se ska menyre tjeter
										        Campground.findById(req.params.id, function(err,foundCampground){
										            if (err  || !foundCampground) {
										            	req.flash("error","The campground you requested doesn't exist.");
										                res.redirect("back");
										            } else {
										                //checks if the current logged in user is the author
										                if (foundCampground.author.id.equals(req.user._id)) {
										                    next();
										                } else {
										                	req.flash("error","Only the author of this post can edit or delete it.");
										                    res.redirect("back");
										                }
										            }
										        })
										    } else {
										    	req.flash("error","You need to be logged in to do that!");
										        res.redirect("/login");
										    }
										};

//middleware to check if it's the author of the comment
middlewareObject.isCommentAuthor =  function (req,res,next){
									    //checks if the user is logged in at all
									    if (req.isAuthenticated()) {
									        //checks if the comment exists at all
									        //nga cfr po marr vesh kte e bejme per te kapur...
									        //id-ne e autorit se ska menyre tjeter
									        Comment.findById(req.params.commentId, function(err,foundComment){
									            if (err  || !foundComment) {
									            	req.flash("error","The comment you requested doesn't exist.");
									                res.redirect("back");
									            } else {
									                //checks if the current logged in user is the author
									                if (foundComment.author.id.equals(req.user._id)) {
									                    next();
									                } else {
									                	req.flash("error","Only the author of this comment can edit or delete it.");
									                    res.redirect("back");
									                }
									            }
									        })
									    } else {
										    req.flash("error","You need to be logged in to do that!");
									        res.redirect("/login");
									    }
									}

module.exports=middlewareObject;