//requiring packages
var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    session                 = require("express-session"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash"),
    seedDB                  = require("./seed");

//requiring models
var Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user");

//requiring routes
var campgroundRoutes        =require("./routes/campgrounds"),
    commentRoutes           =require("./routes/comments"),
    indexRoutes             =require("./routes/index");

//fills up my app with data but right now i don't need it 
// seedDB();
//telling the app to use the css from this file
app.use(express.static(__dirname + "/public"));

//telling the app to use method-override
app.use(methodOverride("_method"));

//stating that we'll be working with ejs files
app.set("view engine","ejs");

//getting mongoose to work in our app
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

//getting body-parser to work
app.use(bodyParser.urlencoded({extended:true}));

//getting flash messages to work
app.use(flash());


//passport configuration
app.use(session({
    secret:"In the night I hear them talk",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
//my own middleware for checking if a user is logged in
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.errorMessage=req.flash("error");
    res.locals.successMessage=req.flash("success");
    next();
})
 
//using the refactored routes
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

//Tell the framework to listen for different requests on which port
app.listen(3000, process.env.IP,function(){
    console.log("The server is up bitches!");
} );