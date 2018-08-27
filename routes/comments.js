var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    middleware      = require("../middleware");

//new route for comments
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn , function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if (err   || !foundCampground) {
            console.log(err);
        } else {
            res.render("comments/new",{campground:foundCampground});
        }
    })
    
})

//create route for comments
router.post("/campgrounds/:id/comments", middleware.isLoggedIn , function(req,res){
    var newComment = {
        text:req.body.text,
        author:{
            id:req.user._id,
            username:req.user.username
        }
    };
    Campground.findById(req.params.id ,function(err,foundCampground){
        if (err  || !foundCampground) {
            console.log(err);
            req.flash("error","Something went wrong");
            res.redirect("/campgrounds");
        } else {
            Comment.create(newComment,function(err,newComment){
                foundCampground.comments.push(newComment);
                foundCampground.save();
                req.flash("success","Your comment was added");
                res.redirect("/campgrounds/"+req.params.id)
            })
            
        }
    })
})

//edit route for comment
router.get("/campgrounds/:id/comments/:commentId/edit", middleware.isCommentAuthor, function(req,res){
    Comment.findById(req.params.commentId,function(err,foundComment){
        if (err   || !foundComment) {
            console.log(err);
            res.redirect("back")
        } else {
               res.render("comments/edit",{comment:foundComment,campgroundId:req.params.id});
        }
    })

})

//update route for comment
router.put("/campgrounds/:id/comments/:commentId", middleware.isCommentAuthor, function(req,res){
    var modifiedComment = {
        text:req.body.text,
    };
    Comment.findByIdAndUpdate(req.params.commentId, modifiedComment, function(err, updatedComment){
        if (err || !updatedComment) {
                 console.log(err);
                 res.redirect("back")
         } else {
                req.flash("success","Your comment was updated");
                res.redirect("/campgrounds/"+req.params.id);
          }
      })
})

//destroy route for comment
router.delete("/campgrounds/:id/comments/:commentId", middleware.isCommentAuthor, function(req,res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else { 
            req.flash("success","Your comment was removed");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


module.exports=router;