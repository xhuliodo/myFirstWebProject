var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campground"),
    middleware      = require("../middleware");

//index route
router.get("/campgrounds",function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
});

//new route for campgrounds
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

//create route  for campgrounds
router.post("/campgrounds",  middleware.isLoggedIn, function(req,res){
    var newCampground={
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        author:{
            id:req.user._id,
            username:req.user.username
        },
        price:req.body.price
    }
    Campground.create(newCampground, function(err,campground){
            if(err){
                console.log("Something went wrong!");
            } else{
                res.redirect("/campgrounds");
            }
    });
})

//show route for campgrounds
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(
        function(err, foundCampground) {
            if(err || !foundCampground){
                req.flash("error","The campground you requested doesn't exist.");
                res.redirect("back");
            } else{
              res.render("campgrounds/show",{campground:foundCampground});  
            }
        })
});

//edit campgrounds
router.get("/campgrounds/:id/edit", middleware.isCampgroundAuthor , function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err  || !foundCampground) {
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        } else {
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    })
})
//update campgrounds
router.put("/campgrounds/:id", middleware.isCampgroundAuthor , function(req,res){
    var modifiedCampground={
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        price:req.body.price
    }
    Campground.findByIdAndUpdate(req.params.id, modifiedCampground, 
        function(err, updatedCampground){
            if (err  || !updatedCampground) {
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/"+req.params.id);
            }
            
    } )
})

//delete campgrounds
router.delete("/campgrounds/:id", middleware.isCampgroundAuthor , function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports=router;