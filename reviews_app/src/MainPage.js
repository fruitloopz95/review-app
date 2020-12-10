import React from 'react';
import { Link ,Route , BrowserRouter , useHistory } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import './MyStyles.css'

class MainPage extends React.Component 
{
	//init satte variables
	constructor(props) 
	{
   		super(props);
   		this.state = {currentPage : "Login" , 
   					  usernameInput : "" , 
   					  passwordInput : "" , 
   					  isAdmin : false ,
   					  resultsTitle : "home",
   					  token : "" ,
   				      latestReviews : [{}] , 
   					  myreviews : [{}] ,
   					  adminReviews : [{}] ,
   					  titleInput : "" , 
   					  categoryInput : "" , 
   					  genreInput : "" , 
   					  reviewInput : "" , 
   					  ratingInput : "",
   					  EditTitle : "" , 
   					  EditCat : "" , 
   					  EditGenre : "" , 
   					  EditReview : "" , 
   					  EditRating : "",
   					  EditId : "" ,
   					  EditUsername : "" , 
   					  keyword : "" , 
   					  myreviewsKeyword : "",
   					  newUser : "",
   					  newPassword : "" ,
   					  DocType : "",
   					  SearchDoc : "",
   					  displayAdminSearch : false , 
   					  EditAdminStatus : false , 
   					  UserEditId : ""
   					 }
    	
 	}	

 	//page navigation
 	GoToSignup()
 	{
 		this.setState({ currentPage : "Signup" })
 	}
 	GoToHome()
 	{
 		this.setState({ currentPage : "Home" , titleInput : ""  , categoryInput : "" , genreInput : "" ,  reviewInput : "" , ratingInput : "" })
 	}
 	GoToAddReviews()
 	{
 		this.setState({ currentPage : "AddReview" })
 	}

 	//onClick do callout to get latest reviews 
 	GoToMyReviews()
 	{
 		fetch('/getMyReviews?username='+ this.state.usernameInput + '&password='+ this.state.passwordInput, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
	        .then((resp) => {
	        	//if none found set an empty record and set page to My reviews
	        	if(Object.keys(resp).length == 0)
	        	{
	        		this.setState({ currentPage : "MyReviews" , myreviews : [{Title : "" , Category : "" , Genre : "" , Review : "" , Rating : "" ,  Username : ""}]})
	        	}
	        	else
	        	{
	        		this.setState({ currentPage : "MyReviews"  , myreviews : resp})	
	        	}
	        })

 		this.setState({ currentPage : "MyReviews" })
 	}

 	//onClick get specific document from db using id 
 	GoToEditReview(event)
 	{
 		let docId = event.target.id;
 		
 		fetch('/getReview?DocId='+ docId, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
	        .then((resp) => {
	        	//if document not found display errorn message to user else set response to state and set page to editpage screen
	        	if(Object.keys(resp).length == 0)
	        	{
	        		alert('Oops something went wrong !');
	        	}
	        	else
	        	{
	        		console.log(resp);
	        		console.log(resp[0].title);
	        		this.setState({ currentPage : "EditReview"  , EditTitle : resp[0].title , EditCat : resp[0].category , EditGenre : resp[0].genre , EditReview : resp[0].review , EditRating : resp[0].rating , EditId : resp[0]._id , EditUsername : resp[0].username})	
	        	}
	        })
 	}

 	//onclick valdiates if user is an admin. If admin then redirects to admin page .if not then displays error messgae to user
 	GoToAdmin()
 	{
 		if(this.state.isAdmin)
 		{
 			this.setState({ currentPage : "AdminPage" })
 		}
 		else
 		{
 			alert('Sorry ! Admins only .');
 		}
 		
 	}

 	//onClick get specific document from db using id 
 	GoToEditUser(event)
 	{
 		let docId = event.target.id;
 		
 		fetch('/getReview?DocId='+ docId, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
	        .then((resp) => {
	        	if(Object.keys(resp).length == 0)
	        	{
	        		alert('Oops something went wrong !');
	        	}
	        	else
	        	{
	        		console.log(resp);
	        		console.log(resp[0].title);
	        		this.setState({ currentPage : "UpdateUser"  , EditUsername : resp[0].username , EditAdminStatus : resp[0].admin , UserEditId : resp[0]._id })	
	        	}
	        })
 		
 	}

 	//sets page to login screen and clears all data in state
 	LogOut()
 	{
 		this.setState({ currentPage : "Login"  ,  reviews : [{}] , username : "" , password : "" })
 	}


	//handle user inputs
 	handleUsername(event)
 	{
 		this.setState({ usernameInput : event.target.value })
 	}

 	handlePassword(event)
 	{
 		this.setState({ passwordInput : event.target.value })
 	}

 	handleTitleInput(event)
 	{
 		this.setState({ titleInput : event.target.value })
 	}

 	handleCategoryInput(event)
 	{
 		this.setState({ categoryInput : event.target.value })
 	}

 	handleGenreInput(event)
 	{
 		this.setState({ genreInput : event.target.value })
 	}

 	handleReviewInput(event)
 	{
 		this.setState({ reviewInput : event.target.value })
 	}

 	handleRatingInput(event)
 	{
 		this.setState({ ratingInput : event.target.value })
 	}

 	handleEditTitle(event)
 	{
 		this.setState({ EditTitle : event.target.value })
 	}

 	handleEditCategory(event)
 	{
 		this.setState({ EditCat : event.target.value })
 	}

 	handleEditGenre(event)
 	{
 		this.setState({ EditGenre : event.target.value })
 	}

 	handleEditReview(event)
 	{
 		this.setState({ EditReview : event.target.value })
 	}

 	handleEditRating(event)
 	{
 		this.setState({ EditRating : event.target.value })
 	}

 	handleKeyword(event)
 	{
 		this.setState({ keyword : event.target.value })
 	}

 	handleMyReviewsKeyword(event)
 	{
 		this.setState({ myreviewsKeyword : event.target.value })
 	}

 	handleNewUsername(event)
 	{
 		this.setState({ newUser : event.target.value })
 	}

 	handleNewPassword(event)
 	{
 		this.setState({ newPassword : event.target.value })
 	}

 	handleDocType(event)
 	{
 		this.setState({ DocType : event.target.value })
 	}

 	handleSearchDoc(event)
 	{
 		this.setState({ SearchDoc : event.target.value })
 	}

 	handleAdminStatus(event)
 	{
 		this.setState({ EditAdminStatus : event.target.value })
 	}

 	


 	validateUserLogin()
 	{
 		//validates if username and password fields are filled in
 		if(this.state.usernameInput != "" && this.state.passwordInput != "")
 		{
 			//does callout to db to find user 
 			fetch('/login?username='+ this.state.usernameInput + '&password='+ this.state.passwordInput , {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
	        .then(
	            (result) => {
	            	//if callout response successful but user not found - update display
                   if (Object.keys(result).length == 0)
                   {
                   	 console.log('empty- user/pass not found')
                   	 alert('Username and password not found.Please try again');
                   	 //this.setState({LoginStatus : "NotFound" })
                   	 document.getElementById("username").value = "";
                   	 document.getElementById("password").value = "";
                   }
                   else
                   {	
                   		//if user found then do callout to get token and set to state
	                   	fetch('/getToken?username='+ this.state.usernameInput + '&password='+ this.state.passwordInput  , {
	                	method: 'get',
	                	headers: {'Content-Type': 'application/json' }
	                	})
	                	.then(res => res.json())
	        			.then(
	        			 (resp) => {
	        			 	//if token callout failed display error to user
	        			 	if(resp.length < 1)
	        			 	{
	        			 		console.log('error')
	        			 		alert('Token not received');
	        			 	}
	        			 	else
	        			 	{
	        			 		//do callout to get all reviews , set response to state and set page to Home screen
	        			 		fetch('/getLatestReviews' , {
				                method: 'get',
				                headers: {'Content-Type': 'application/json'}
				                
				           		})
				           		.then(reviewRes => reviewRes.json())
				           		.then((reviewResp) => 
				           		{

				           			if (Object.keys(reviewResp).length == 0)
				                    {
					                   	console.log('no reviews found')   
					                   	this.setState({ latestReviews : [{Title : "" , Category : "" , Genre : "" , Review : "" , Rating : ""  , Username : ""}] ,  token : resp.token , currentPage : 'Home' })     	
				                    }
				                    else
				                    {
				                    	
				                    	this.setState({ latestReviews : reviewResp ,  token : resp.token , currentPage : 'Home' , isAdmin : result[0].admin})
				                   
				                    }
				           		})
				           		this.setState({ currentPage : 'Home' })
	        			 	}
	        			 	
	        			})
                   }
	            })
	            	

 		}
 		else
 		{
 			alert('Please fill in username and password and try again');
 		}

 	}

 	AddUser()
 	{
 		//validate if both suername and password fields are filled in 
 		if( this.state.newUser != "" && this.state.newPassword != "" )
 		{
 			//do callout to create user
 			let data = { username : this.state.newUser , password : this.state.newPassword};
 			fetch('/createUser', {
                method: 'post',
                headers: {'Content-Type': 'application/json' } ,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then( (result) => {

            	
            	alert(result.message);
            	document.getElementById("username").value = "";
            	document.getElementById("password").value = "";
            	this.setState({ currentPage :"Login" , newUser : "" , newPassword : "" })

            })
 		}
 		else
 		{
 			alert('Please fill in all the fields and try again.');
 		}
 	}

 	
    deleteReview(event)
    {
    	//get doucment Id 
    	let docId = event.target.id;
    	//if id not blank do callout to delete record
 		if(docId != "")
 		{
 			let data = {DocId : docId };

	 		fetch('/deleteReview', {
	        method: 'delete',
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify(data)
	   		})
	        .then(res => res.json())
	        .then((resp) => {

	        	console.log(resp);
	        	//if record successfully deleted do callout to egt all reviews and set updated list to state
	        	if(resp.message == "review removed !")
	        	{
	        		fetch('/getMyReviews?username='+ this.state.usernameInput + '&password='+ this.state.passwordInput, {
	                method: 'get',
	                headers: {'Content-Type': 'application/json'}
		            })
		            .then(res => res.json())
			        .then((resp) => {
			        	if(Object.keys(resp).length == 0)
			        	{
			        		this.setState({ currentPage : "MyReviews" , myreviews : [{Title : "" , Category : "" , Genre : "" , Review : "" , Rating : "" ,  Username : ""}]})
			        	}
			        	else
			        	{
			        		this.setState({ currentPage : "MyReviews"  , myreviews : resp})	
			        	}
			        })

	        	}
	        	else
	        	{
	        		alert(resp.message);
	        	}

	        })

 		}
 		else
 		{
 			alert('Something went wrong !');
 		}

    }

    AddNewReview()
    {
    	//validates inputs are not blank
    	if(this.state.titleInput == "" || this.state.categoryInput == "" || this.state.genreInput == "" || this.state.ratingInput == "" || this.state.reviewInput == "" )
    	{
    		alert("Please check that all fields are filled in and try again.");
    	}
    	else
    	{
    		let username = this.state.usernameInput ;
    		let password = this.state.passwordInput ;
    		let title = this.state.titleInput ;
    		let cat = this.state.categoryInput ;
    		let gen = this.state.genreInput ;
    		let rev = this.state.reviewInput ;
    		let rate = this.state.ratingInput ;
    		let adm = this.state.isAdmin ;
    		let tokenVal = this.state.token ;

    		let data = {username : username  , password : password , admin : adm , title : title , category : cat ,  genre : gen ,  review : rev ,  rating : rate };
			
			//call api and pass payload with token then set response to state
			fetch('/postreview', {
                method: 'post',
                headers: {'Content-Type': 'application/json' , 'authorization' : 'bearer ' + tokenVal} ,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then( (result) => {

            	console.log(result.message);
            	//if successful does callout to get updated list of reviews then sets to state
            	if(result.message == 'Added!')
            	{
            		fetch('/getLatestReviews' , {
	                method: 'get',
	                headers: {'Content-Type': 'application/json'}
	           		})
	           		.then(reviewRes => reviewRes.json())
	           		.then((reviewResp) => 
	           		{

	           			if (Object.keys(reviewResp).length == 0)
	                    {
		                   	console.log('no reviews found')   
		                   	this.setState({ latestReviews : [{Title : "" , Category : "" , Genre : "" , Review : "" , Rating : ""  , Username : ""}] , currentPage : 'Home' ,
		                   					titleInput : ""  , categoryInput : "" , genreInput : "" ,  reviewInput : "" , ratingInput : "" })     	
	                    }
	                    else
	                    {
	                    	this.setState({ latestReviews : reviewResp , currentPage : 'Home' , titleInput : ""  , categoryInput : "" , genreInput : "" ,  reviewInput : "" , ratingInput : ""  })
	                    }
	           		})
	           		
            	}

            })
    	}
    }

    UpdateReview()
    {	
    	//validate if all fields are filled in
    	if( this.state.EditTitle == "" ||  this.state.EditCat == "" ||  this.state.EditGenre == "" ||  this.state.EditReview == "" ||  this.state.EditRating == "" )
    	{
    		alert("All fields are required. Please fill in fields and try again.");
    	}
    	else
    	{
    		// does callout to update record
    		let tokenVal = this.state.token ;
    		let data = {DocId : this.state.EditId , edTitle : this.state.EditTitle , edCat : this.state.EditCat , edGenre : this.state.EditGenre , edReview : this.state.EditReview , edRating : this.state.EditRating , username : this.state.usernameInput , password : this.state.passwordInput};
    		fetch('/updateReview', {
                method: 'put',
                headers: {'Content-Type': 'application/json' } ,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then( (result) => {

            	console.log(result.message);
            	//if successful does callout to get updated list of reviews and set to state
            	if(result.message == 'Updated!')
            	{
            		alert('Update successful !');

            		fetch('/getMyReviews?username='+ this.state.usernameInput + '&password='+ this.state.passwordInput, {
	                method: 'get',
	                headers: {'Content-Type': 'application/json'}
	                //body: JSON.stringify(data)
		            })
		            .then(res => res.json())
			        .then((resp) => {
			        	if(Object.keys(resp).length == 0)
			        	{
			        		this.setState({ currentPage : "MyReviews" , myreviews : [{Title : "" , Category : "" , Genre : "" , Review : "" , Rating : "" ,  Username : ""}]})
			        	}
			        	else
			        	{
			        		this.setState({ currentPage : "MyReviews"  , myreviews : resp})	
			        	}
			        })
            	}

            })
    	}
    }

    SearchKeyword()
    {
    	//onclick gets keyword from state and does callout to get all records containing keyword and set to state
    	fetch('/Search?keyword=' + this.state.keyword , {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
        })
   		.then(reviewRes => reviewRes.json())
   		.then((reviewResp) => 
   		{

   			if (Object.keys(reviewResp).length == 0)
            {
               	console.log('no reviews found')  
               	alert('No matches found!');  	
            }
            else
            {
            	this.setState({ latestReviews : reviewResp , resultsTitle : "resultsSet"})
            }
   		})
    	
    }

    SearchMyReviews()
    {
    	////do callout to search keyword in my reviews and set response to state
    	fetch('/SearchMyReviews?keyword=' + this.state.myreviewsKeyword + '&username='+ this.state.usernameInput + '&password='+ this.state.passwordInput  , {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
   		})
   		.then(reviewRes => reviewRes.json())
   		.then((reviewResp) => 
   		{

   			if (Object.keys(reviewResp).length == 0)
            {
               	console.log('no reviews found')  
               	alert('No matches found !');        	   	
            }
            else
            {
            	this.setState({ myreviews : reviewResp })
            	console.log(this.state.myreviews);
            }
   		})
    }



    //function to render all current user records
    renderMyReviews()
 	{
      return this.state.myreviews.map((review, index) => {
         
         return (
            <div className = "ReviewDiv">

  				<h1>{review.title}</h1>
  				<h3>{review.category}</h3>
  				<h3>{review.genre}</h3>
  				<p>
  				   {review.review}
  				</p>
  				
  					My rating : {review.rating} /10
  				
  				<hr/>
  				
  				<div className = "MyActions">
	            	<button id = {review._id} onClick = {this.GoToEditReview.bind(this)} >edit</button>
	            	<button id = {review._id} onClick = {this.deleteReview.bind(this)} >delete</button>
	            </div>

  			</div>
         )
      })
    }

    //function to render all reviews 
 	renderLatestReview()
 	{
 		if(Object.keys(this.state.latestReviews).length != 0)
 		{
 			return this.state.latestReviews.map((review, index) => {
         
	         return (
	            <div className = "ReviewDiv">
	  				<h1>{review.title}</h1>
	  				<h3>{review.category}</h3>
	  				<h3>{review.genre}</h3>
	  				<p>
	  				   {review.review}
	  				</p>
	  					
	  				<hr/>	

					<div className = "UsernameRating">
						{review.username} &nbsp;
						{review.rating} /10
					</div>
	  				
	  				<hr/>	
			
	  			</div>
	         )
	      })
 		}
 		else
 		{
 			alert(Object.keys(this.state.latestReviews).length);
 		}
      
    }

    //based on search status sets title on home page 
    setResultsTitile()
    {
    	
    		if(this.state.resultsTitle == "home")
    		{
    			return (
    			<div>
  					what's new
  			    </div>
  			    )
    		}
			else if(this.state.resultsTitle == "resultsSet")
			{
				return (
    			<div>
  					Results
  			    </div>
  			    )
			}    	
    }



    //function to render all records - admin access 
    renderAdminRecords()
 	{
 		if(this.state.displayAdminSearch)
 		{	//if admin searches user 
 			if(this.state.DocType == "user" )
	 		{
	 			return this.state.adminReviews.map((review, index) => {
	         
		         return (
		            <div className = "ReviewDiv">

		  				<h1>{review.username}</h1>
		  				<h3>Admin user : {String(review.admin)}</h3>

		  				
		  				<hr/>
		  				
		  				<div className = "MyActions">
			            	<button id = {review._id} onClick = {this.GoToEditUser.bind(this)} >edit</button>
			            	<button id = {review._id} onClick = {this.deleteReview.bind(this)} >delete</button>
			            </div>

		  			</div>
		         )
		      })
	 		}
	 		else 
	 		{//if admin searches records
	 			return this.state.adminReviews.map((review, index) => {
	         
		         return (
		            <div className = "ReviewDiv">

		  				<h1>{review.title}</h1>
		  				<h3>{review.category}</h3>
		  				<h3>{review.genre}</h3>
		  				<p>
		  				   {review.review}
		  				</p>
		  					
		  					User : {review.username}
		  					<br/>
		  					My rating : {review.rating} /10
		  				
		  				<hr/>
		  				
		  				<div className = "MyActions">
			            	<button id = {review._id} onClick = {this.GoToEditReview.bind(this)} >edit</button>
			            	<button id = {review._id} onClick = {this.deleteReview.bind(this)} >delete</button>
			            </div>

		  			</div>
		         )
		      })
	 		}
 		}   
    }

    AdminSearch()
    {
    	//onclick gets all records and sets to state
    	if( this.state.DocType == "")
    	{
    		alert("Please select either user or record and try again.");
    	}

		fetch('/AdminSearch?keyword=' + this.state.SearchDoc + '&docType=' + this.state.DocType , {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
   		})
   		.then(reviewRes => reviewRes.json())
   		.then((reviewResp) => 
   		{

   			if (Object.keys(reviewResp).length == 0)
            {
               	console.log('no reviews found')  
               	alert('No matches found !');        	   	
            }
            else
            {
            	this.setState({ adminReviews : reviewResp , displayAdminSearch : true })
            }
   		})
    }

    UpdateUser()
    {
    	//does callout to update user's admin status 
    	let data = { isAdmin : this.state.EditAdminStatus , DocId : this.state.UserEditId };
    		fetch('/updateUser', {
                method: 'put',
                headers: {'Content-Type': 'application/json' } ,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then( (result) => {

            	console.log(result.message);

            	if(result.message == 'Updated!')
            	{
            		alert('Update successful !');
            		this.setState({ currentPage : "AdminPage" , adminReviews : [{}] })
            	}

            })
    }

    //render different components based on state value
 	render() 
 	{
 		if(this.state.currentPage == "Login")
 		{
 			return (
		      <div className = "LoginContainer">		

		      		<h2>The review space </h2>
		      		
				    <div className = "myInputSection">
				    	<input type = "text" id = "username" className = "inpField" placeholder = "Username" onChange = {this.handleUsername.bind(this)}/>
				    	<br/>
				    	<input type = "text" id = "password" className = "inpField" placeholder = "Password" onChange = {this.handlePassword.bind(this)}/>
				    	<br/>
				    	<button className = "Login"  onClick = {this.validateUserLogin.bind(this)}> Login </button>
				    	<br/>
				    	or
				    	<br/>
				        <button className = "Signup"  onClick = {this.GoToSignup.bind(this)}> Signup </button>  

				    </div>
		      </div>		
    		);
 		}

 		else if(this.state.currentPage == "Signup")
 		{
 			return (
 				<div className = "LoginContainer">		

	      		<h2>The review space </h2>
	      		
			    <div className = "myInputSection">
			    	<input type = "text" id = "username" className = "inpField" placeholder = "Username"  onChange = {this.handleNewUsername.bind(this)}/>
			    	<br/>
			    	<input type = "text" id = "password" className = "inpField" placeholder = "Password"  onChange = {this.handleNewPassword.bind(this)}/>
			    	<br/>
			    	<div className = "Login">
				    	<button className = "Signup" onClick = {this.AddUser.bind(this)} > Signup </button>			    	
				        <button className = "Cancel" onClick = {this.LogOut.bind(this)}> Cancel </button> 
			        </div>
			    </div>
	       		</div>
	       	);		
 		}

 		else if(this.state.currentPage == "Home")
 		{
 			return (
 				<div className = "Container">		

		      		<div className = "HomeHeader">
			      		<div className = "PageTitle">
			      			Welcome {this.state.usernameInput}
			      		</div>
			      		<div className = "NavLinks">
			      			<div>
			      				<button onClick = {this.GoToMyReviews.bind(this)} >my reviews</button> 
			      				<button onClick = {this.GoToAdmin.bind(this)} >Admin</button> 
			      				<button onClick = {this.LogOut.bind(this)} >Sign out</button>
			      			</div>
			      		</div>
		      		</div>

		     	 	<div className = "Body">

			      		<div className = "SearchComponent">
			      			<input type = "text" id = "keyword" className = "HomeSearch" placeholder = "Enter keyword" onChange = {this.handleKeyword.bind(this)}/>
					    	<br/>
					    	<button className = "Search" onClick = {this.SearchKeyword.bind(this)} > Search </button>
			      		</div>

			      		<br/>

			      		<div className = "ResultsTitile">
			      			{this.setResultsTitile()}
			      			<hr/>
			      		</div>

			      		<div className = "ReviewsSection">
			      			{this.renderLatestReview()}
			      		</div>

		     	 	</div>

		     	 	<div className = "Footer">
			      		<div className = "AddButton">
			      			<button className = "TheAddNewReveiwButton" onClick = {this.GoToAddReviews.bind(this)} >Add review</button>
			      		</div>
		      		</div>

	    	  </div>
	    	);		
 		}

 		else if(this.state.currentPage == "AddReview")
 		{
 			return (
		      <div className = "AddReviewContainer">		

		      	<div className = "HomeHeader">
		      		<div className = "PageTitle">
		      			Add review
		      		</div>
		      		<div className = "NavLinks">
		      			<div>
		      				<button onClick = {this.GoToHome.bind(this)} > Home </button> 
		      				<button onClick = {this.GoToAdmin.bind(this)} >Admin</button> 
		      				<button onClick = {this.LogOut.bind(this)} >Sign out</button>  
		      			</div>
		      		</div>
		      	</div>

		      	<div className = "AddReviewBody">

		      		<div className = "myInputSection">

		      			<table>
		      				<tr>
		      					<td>
		      						<input type = "text" id = "Title" className = "inpField" placeholder = "Title" onChange = {this.handleTitleInput.bind(this)} />
		      					</td>
		      					<td>
		      						my rating: 
		      						<select onChange = {this.handleRatingInput.bind(this)}>
									    <option></option>
				                    	<option value = "1">1</option>
				                    	<option value = "2">2</option>
				                    	<option value = "3">3</option>
				                    	<option value = "4">4</option>
				                    	<option value = "5">5</option>
				                    	<option value = "6">6</option>
				                    	<option value = "7">7</option>
				                    	<option value = "8">8</option>
				                    	<option value = "9">9</option>
				                    	<option value = "10">10</option>
				                    </select>
				      			</td>
		      					
		      				</tr>
		      				<tr>
		      					<td>
		      						<select className = "SearchConditions" onChange = {this.handleCategoryInput.bind(this)}>
									    <option>Select Category</option>
				                    	<option value = "Movies">Movies</option>
				                    	<option value = "Series">Series</option>
				                    	<option value = "Documentary">Documentary</option>
				                    	<option value = "Anime">Anime</option>
				                    	<option value = "Other">Other</option>
				                    </select>
		      					</td>
		      					<td></td>
		      				</tr>
		      				<tr>
		      					<td>
					      			<select className = "SearchConditions" onChange = {this.handleGenreInput.bind(this)}>
									    <option>Select Genre</option>
				                    	<option value = "Action">Action</option>
				                    	<option value = "Adventure">Adventure</option>
				                    	<option value = "Comedy">Comedy</option>
				                    	<option value = "Crime">Crime</option>
				                    	<option value = "Drama">Drama</option>
				                    	<option value = "Fantasy">Fantasy</option>
				                    	<option value = "Horror">Horror</option>
				                    	<option value = "Mystery">Mystery</option>
				                    	<option value = "Thriller">Thriller</option>
				                    	<option value = "Western">Western</option>
				                    	<option value = "Other">Other</option>
				                    </select>
		      					</td>
		      					<td></td>
		      				</tr>
		      			</table>

						<div className = "ReviewArea">				    	
					    	<textarea type = "text" id = "Genre" className = "inpField" placeholder = "Add review here..." onChange = {this.handleReviewInput.bind(this)}/>
					    	<br/>
						    	<button onClick = {this.AddNewReview.bind(this)}  > Post review ! </button>
						    	<button onClick = {this.GoToHome.bind(this)}  > Cancel </button>
					    	</div>
				    </div>
		      		
		      	</div>

		      </div>		
	    	);
 		}

    	else if(this.state.currentPage == "MyReviews")
 		{
 			return (
		      <div className = "Container">		

		      	<div className = "HomeHeader">
		      		<div className = "PageTitle">
		      			My Reviews
		      		</div>
		      		<div className = "NavLinks">
		      			<div>
		      				<button onClick = {this.GoToHome.bind(this)}> Home </button> 
		      				<button onClick = {this.GoToAdmin.bind(this)} >Admin</button> 
		      				<button onClick = {this.LogOut.bind(this)}>Sign out</button> 
		      			</div>
		      		</div>
		      	</div>

		      	<div className = "Body">

		      		<div className = "SearchComponent">
			      			<input type = "text" id = "keyword" className = "HomeSearch" placeholder = "Enter keyword" onChange = {this.handleMyReviewsKeyword.bind(this)}/>
			      			
					    	<br/>
					    	<button className = "Search" onClick = {this.SearchMyReviews.bind(this)} > Search </button>
			      	</div>

				    <div className = "ReviewsSection">
			      			{this.renderMyReviews()}
			      	</div>
		      		
		      	</div>

		      	<div className = "Footer">
		      		<div className = "AddButton">
		      		 	<button className = "TheAddNewReveiwButton" onClick = {this.GoToAddReviews.bind(this)}>Add review</button> 
		      		</div>
		      	</div>
		      

		      </div>		
	    	);
 		}

 		else if(this.state.currentPage == "EditReview")
 		{
 			return (
		      <div className = "AddReviewContainer">		

		      	<div className = "HomeHeader">
		      		<div className = "PageTitle">
		      			Edit review
		      		</div>
		      		<div className = "NavLinks">
		      			<div>
		      				<button onClick = {this.GoToHome.bind(this)} > Home </button> 
		      				<button onClick = {this.GoToAdmin.bind(this)} >Admin</button> 
		      				<button onClick = {this.LogOut.bind(this)} >Sign out</button>  
		      			</div>
		      		</div>
		      	</div>

		      	<div className = "AddReviewBody">

		      		<div className = "myInputSection">

		      			<table>
		      				<tr>
		      					<td>
		      						<input type = "text" id = "Title" className = "inpField" placeholder = "Title" value = {this.state.EditTitle} onChange = {this.handleEditTitle.bind(this)}/>
		      					</td>
		      					<td>
		      						my rating: 
		      						<select value = {this.state.EditRating} onChange = {this.handleEditRating.bind(this)} >
									    <option></option>
				                    	<option value = "1">1</option>
				                    	<option value = "2">2</option>
				                    	<option value = "3">3</option>
				                    	<option value = "4">4</option>
				                    	<option value = "5">5</option>
				                    	<option value = "6">6</option>
				                    	<option value = "7">7</option>
				                    	<option value = "8">8</option>
				                    	<option value = "9">9</option>
				                    	<option value = "10">10</option>
				                    </select>
				      			</td>
		      					
		      				</tr>
		      				<tr>
		      					<td>
		      						<select className = "SearchConditions" value = {this.state.EditCat} onChange = {this.handleEditCategory.bind(this)}>
									    <option>Select Category</option>
				                    	<option value = "Movies">Movies</option>
				                    	<option value = "Series">Series</option>
				                    	<option value = "Documentary">Documentary</option>
				                    	<option value = "Anime">Anime</option>
				                    	<option value = "Other">Other</option>
				                    </select>
		      					</td>
		      					<td></td>
		      				</tr>
		      				<tr>
		      					<td>
					      			<select className = "SearchConditions" value = {this.state.EditGenre} onChange = {this.handleEditGenre.bind(this)}>
									    <option>Select Genre</option>
				                    	<option value = "Action">Action</option>
				                    	<option value = "Adventure">Adventure</option>
				                    	<option value = "Comedy">Comedy</option>
				                    	<option value = "Crime">Crime</option>
				                    	<option value = "Drama">Drama</option>
				                    	<option value = "Fantasy">Fantasy</option>
				                    	<option value = "Horror">Horror</option>
				                    	<option value = "Mystery">Mystery</option>
				                    	<option value = "Thriller">Thriller</option>
				                    	<option value = "Western">Western</option>
				                    	<option value = "Other">Other</option>
				                    </select>
		      					</td>
		      					<td></td>
		      				</tr>
		      			</table>

						<div className = "ReviewArea">				    	
					    	<textarea type = "text" id = "Genre" className = "inpField" placeholder = "Genre" value = {this.state.EditReview} onChange = {this.handleEditReview.bind(this)}/>
					    	<br/>
						    	<button onClick = {this.UpdateReview.bind(this)}  > Update review ! </button>
						    	<button onClick = {this.GoToMyReviews.bind(this)}  > Cancel </button>
					    	</div>
				    </div>
		      		
		      	</div>

		      </div>		
	    	);
 		}
 		else if(this.state.currentPage == "AdminPage")
 		{
 			return (
		      <div className = "Container">		

		      	<div className = "HomeHeader">
		      		<div className = "PageTitle">
		      			Admin page
		      		</div>
		      		<div className = "NavLinks">
		      			<div>
		      				<button onClick = {this.GoToHome.bind(this)}> Home </button> 
		      			
		      				<button onClick = {this.LogOut.bind(this)}>Sign out</button> 
		      			</div>
		      		</div>
		      	</div>

		      	<div className = "Body">

		      		<div className = "SearchComponent">
			      			<input type = "text" id = "keyword" className = "HomeSearch" placeholder = "Enter keyword" onChange = {this.handleSearchDoc.bind(this)}/>
			      			<select onChange = {this.handleDocType.bind(this)}>
			      				<option value = ""></option>
			      				<option value = "user">User</option>
			      				<option value = "record">Record</option>
			      			</select>
					    	<br/>
					    	<button className = "Search" onClick = {this.AdminSearch.bind(this)} > Search </button>
			      	</div>

				    <div className = "ReviewsSection">
			      			{this.renderAdminRecords()}
			      	</div>
		      		
		      	</div>

		      	<div className = "Footer">
		      		<div className = "AddButton">
		      		 	<button className = "TheAddNewReveiwButton" onClick = {this.GoToAddReviews.bind(this)}>Add review</button> 
		      		</div>
		      	</div>
		      

		      </div>		
	    	);
 		}
 		else if(this.state.currentPage == "UpdateUser")
 		{
 			return (
		      <div className = "AddReviewContainer">		

		      	<div className = "HomeHeader">
		      		<div className = "PageTitle">
		      			Edit user
		      		</div>
		      		<div className = "NavLinks">
		      			<div>
		      				<button onClick = {this.GoToHome.bind(this)} > Home </button> 
		      				<button onClick = {this.GoToAdmin.bind(this)} >Admin</button> 
		      				<button onClick = {this.LogOut.bind(this)} >Sign out</button>  
		      			</div>
		      		</div>
		      	</div>

		      	<div className = "AddReviewBody">

		      		<div className = "myInputSection">

		      			<table>
		      				<tr>
		      					<td>
		      						<h2> Username </h2>
		      						<h3> {this.state.EditUsername} </h3>
		      					</td>
		      							
		      				</tr>
		      				
		      				<tr>
		      					<td> Admin user ? &nbsp;
					      			<select className = "SearchConditions" value = {this.state.EditGenre} onChange = {this.handleAdminStatus.bind(this)} value = {this.state.EditAdminStatus}>
									    <option></option>
				                    	<option value = "true">Yes</option>
				                    	<option value = "false">No</option>    	
				                    </select>
		      					</td>
		      					<td></td>
		      				</tr>
		      			</table>

						<div className = "ReviewArea">				    	
					    	
						    	<button onClick = {this.UpdateUser.bind(this)}  > Update user ! </button>
						    	<button onClick = {this.GoToAdmin.bind(this)}  > Cancel </button>
					    	</div>
				    </div>
		      		
		      	</div>

		      </div>		
	    	);
 		}
  	}
}
 
export default MainPage;

