var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    passport    = require("passport");

//routes
router.get("/",function(req,res){
    res.render("landing");
});

//authentication routes

//registering routes
router.get("/register",function(req,res){
    res.render("campgrounds/register");
})

router.post("/register", function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err,newUser){
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register")
        } else {
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp "+ newUser.username);
                res.redirect("/campgrounds");
            })
        }
    })
})

//login routes
router.get("/login",function(req,res){
    res.render("campgrounds/login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req,res){
        req.flash("success","Welcome back "+req.user.username);
        req.flash("error",err.message);
})

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully logged out");
    res.redirect("/");
})


module.exports=router;