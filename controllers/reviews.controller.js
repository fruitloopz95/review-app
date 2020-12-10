//import model and mongoose package
const review = require('../models/reviews.model.js');
const mongoose = require('mongoose');
const jwt = require ( 'jsonwebtoken' )

//query to update review using doc id
exports.updateReview = function(req, res) 
{
    let query = { _id : req.body.DocId };
    
    review.updateOne( query, { $set: { title : req.body.edTitle , category : req.body.edCat , genre : req.body.edGenre , review : req.body.edReview , rating : req.body.edRating  } }, function(err, doc)
    {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        }
        else
        {
           res.send({message : "Updated!"});
        }
        
    });
  
}

//query to update user using doc id
exports.updateUser = function(req, res) 
{
    let query = { _id : req.body.DocId };
    
    review.updateOne( query, { $set: { admin : req.body.isAdmin  } }, function(err, doc)
    {
        if (err) {
            console.log("Something wrong when updating data!");
            res.send("ERROR: Not Updated. " + err);
        }
        else
        {
           res.send({message : "Updated!"});
        }
        
    });
  
}

//query to get all reviews
exports.SearchReviews = function(req, res)
{   
    //if keyword is blank return all records else do call where title contains keyword specified
    if(req.query.keyword == "")
    {
        let query = {"type" : "record"} ;
        review.find( query , function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "not found !" , error : err });
            }
            else
            {
                res.send(results);
            }
        });
    }
    else
    {
        let query = {  $and: [ {"title" : { $regex : ".*"+ req.query.keyword + ".*" }} , {"type" : "record"} ] };
        review.find( query , function(err, results) 
        {
            if (err) 
            {
                console.log(err);
                res.status(500).send({ message: "not found !" , error : err });
            }
            else
            {
                res.send(results);
            }
        });
    }

}

//query to get all current users reviews
exports.SearchMyReviews = function(req, res)
{   
    if(req.query.keyword == "")
    {
        let query = { $and: [ { username : req.query.username } , { password: req.query.password } , {"type" : "record"}  ] };
        
        review.find(query ,function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "not found !" , error : err });
            }
            else
            {
                res.send(results);
            }
        });
    }
    else
    {
        let query = { $and: [ { username : req.query.username } , { password: req.query.password } , { "title" : { $regex : ".*"+ req.query.keyword + ".*" } } , {"type" : "record"} ] };
        review.find( query , function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "not found !" , error : err });
        }
        else
        {
            res.send(results);
        }
    });
    }
    
}

//delete record based on document id
exports.deleteReview = function(req, res)
{
    review.findOneAndRemove({ _id: req.body.DocId }, function(err) {
        if (err) {
            console.log("Failed to delete review . " + err);
            res.send({message : "Failed to delete review . " + err });
        }
        res.send({message : "review removed !"});
    });

}

//return record based on Id
exports.getReview = function(req, res)
{
    let query = {  _id: req.query.DocId };
    review.find(query , function(err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "not found !" , error : err });
        }
        else
        {
            res.send(users);
        }
    });

}

//return user if in db 
exports.findUser = function(req, res)
{
    let query = { $and: [ { username : req.query.username } , { password: req.query.password }  , { type : "user"} ] };
    review.find(query ,function(err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Username and password not found !" , error : err });
        }
        else
        {
            res.send(users);
        }
    });

}

//get all records in bd
exports.getAll = function(req, res)
{
    let query = { type : "record" };
    review.find( query ,function(err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "not found !" , error : err });
        }
        else
        {
            res.send(users);
        }
    });

}

//return all current users reviews only
exports.getMyReviews = function(req, res)
{
    let query = { $and: [ { username : req.query.username } , { password: req.query.password } , { type : "record"} ] };
    review.find(query , function(err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "not found !" , error : err });
        }
        else
        {
            res.send(users);
        }
    });

}

exports.createUser = function(req, res)
{  
    // Createnew user obj
    let NewUser = new review(
    {
        username: req.body.username,
        password: req.body.password, 
        admin: false, 
        title : "" , 
        genre : "",
        category : "",
        review : "",
        rating :"",
        type : "user"
        
    });
    //save user obj to db
    NewUser.save(function(err, data) 
    {
        if (err) 
        {
            console.log(err);
            res.status(500).send({ message: err});
        } 
        else
        {
            console.log(data);
            res.send({message : "User successfully created !"});
        }
    });

}

exports.addReview = function(req, res)
{  
    // Create and Save a new review document
    let NewReview = new review(
    {
        username: req.body.username ,
        password: req.body.password , 
        admin: req.body.adminStatus , 
        title : req.body.title ,
        category : req.body.category , 
        genre : req.body.genre , 
        review : req.body.review , 
        rating : req.body.rating ,
        type : "record"
        
    });
    NewReview.save(function(err, data) 
    {
        if (err) 
        {
            console.log(err);
            res.status(500).send({ message: err});
        } 
        else
        {
            console.log(data);
            res.status(200).send({ message :'Added!' });
        }
    });

}

//do query to get all records records based on keyword
exports.AdminSeach = function(req, res)
{
    if(req.query.keyword == "")
    {
        let query = { "type" : req.query.docType  };
        review.find( query ,function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "not found !" , error : err });
            }
            else
            {
                res.send(results);
            }
        });
    }
    else
    {
        let query = { $and : [ { "type" : req.query.docType } , {"title" : { $regex : ".*"+ req.query.keyword + ".*" }} ] };
        review.find( query ,function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "not found !" , error : err });
            }
            else
            {
                res.send(results);
            }
        });
    }

}