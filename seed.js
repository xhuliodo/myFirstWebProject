var mongoose	=require("mongoose"),
Campground 		=require("./models/campground"),
Comment 		=require("./models/comment");

var data=[
	{
		name:"Starry Mountain", 
		image:"https://images.unsplash.com/photo-1531097517181-3de20fd3f05c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=21e8b8882ebe52dd2cea9022b73b9861&auto=format&fit=crop&w=1500&q=80",
		description:"Bacon ipsum dolor amet turkey jerky venison tenderloin pastrami t-bone. Shoulder shank cow tail filet mignon, pastrami tri-tip ribeye brisket doner chicken. Meatloaf pork brisket venison shoulder pork belly strip steak porchetta beef pastrami jerky chuck. Ham alcatra tongue, pork jerky turducken drumstick ball tip flank t-bone picanha. Fatback alcatra pastrami chuck frankfurter spare ribs andouille sausage jowl pork belly pancetta pork chop meatloaf beef. Sirloin andouille doner landjaeger, short ribs shank ground round buffalo strip steak t-bone bacon spare ribs ham beef ribs. Turducken filet mignon buffalo shankle, short ribs pork alcatra kevin ground round pork chop boudin leberkas brisket spare ribs cupim. Bresaola pastrami frankfurter meatball pork. Rump meatball biltong, sirloin corned beef jerky turducken pancetta alcatra jowl brisket andouille beef. Turducken capicola pastrami, salami drumstick pork loin flank. T-bone kevin brisket corned beef, beef rump shoulder flank hamburger filet mignon shank ribeye."
	},

	{
		name:"Friendship Rock", 
		image:"https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c8fc5a023e80b24f9fa26451a3c52cc&auto=format&fit=crop&w=1500&q=80",
		description:"Bacon ipsum dolor amet turkey jerky venison tenderloin pastrami t-bone. Shoulder shank cow tail filet mignon, pastrami tri-tip ribeye brisket doner chicken. Meatloaf pork brisket venison shoulder pork belly strip steak porchetta beef pastrami jerky chuck. Ham alcatra tongue, pork jerky turducken drumstick ball tip flank t-bone picanha. Fatback alcatra pastrami chuck frankfurter spare ribs andouille sausage jowl pork belly pancetta pork chop meatloaf beef. Sirloin andouille doner landjaeger, short ribs shank ground round buffalo strip steak t-bone bacon spare ribs ham beef ribs. Turducken filet mignon buffalo shankle, short ribs pork alcatra kevin ground round pork chop boudin leberkas brisket spare ribs cupim. Bresaola pastrami frankfurter meatball pork. Rump meatball biltong, sirloin corned beef jerky turducken pancetta alcatra jowl brisket andouille beef. Turducken capicola pastrami, salami drumstick pork loin flank. T-bone kevin brisket corned beef, beef rump shoulder flank hamburger filet mignon shank ribeye."
	},

	{
		name:"Native Desert", 
		image:"https://images.unsplash.com/photo-1520732713659-8f14034ba7d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a330e0a93ad58039a3d719ee837c6a4&auto=format&fit=crop&w=1500&q=80",
		description:"Bacon ipsum dolor amet turkey jerky venison tenderloin pastrami t-bone. Shoulder shank cow tail filet mignon, pastrami tri-tip ribeye brisket doner chicken. Meatloaf pork brisket venison shoulder pork belly strip steak porchetta beef pastrami jerky chuck. Ham alcatra tongue, pork jerky turducken drumstick ball tip flank t-bone picanha. Fatback alcatra pastrami chuck frankfurter spare ribs andouille sausage jowl pork belly pancetta pork chop meatloaf beef. Sirloin andouille doner landjaeger, short ribs shank ground round buffalo strip steak t-bone bacon spare ribs ham beef ribs. Turducken filet mignon buffalo shankle, short ribs pork alcatra kevin ground round pork chop boudin leberkas brisket spare ribs cupim. Bresaola pastrami frankfurter meatball pork. Rump meatball biltong, sirloin corned beef jerky turducken pancetta alcatra jowl brisket andouille beef. Turducken capicola pastrami, salami drumstick pork loin flank. T-bone kevin brisket corned beef, beef rump shoulder flank hamburger filet mignon shank ribeye."
	},

]

function seed(){
	//remove all camprounds
	Campground.remove({},function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("All your data has been removed");
			//add a few campgrounds
			data.forEach(function(camp){
				Campground.create(camp,function(err,newCampground){
					if (err) {
						console.log(err)
					} else {
						console.log("Just added a new campground");
						//create a comment for each campground
						Comment.create({
							text:"This place is great but I just don't like camping",
							author:"Homer Simpson"
						}, function(err,newComment){
							if (err) {
								console.log(err)
							} else {
								newCampground.comments.push(newComment);
								newCampground.save(function(err, commentedCampground){
									if (err) {
										console.log(err)
									} else {
										console.log("Just added a new comment.")
									}
								})
								
							}
						})
					}
				})
			})
		}

	})

}

module.exports=seed;