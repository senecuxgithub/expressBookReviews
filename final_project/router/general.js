const express = require('express');
var prompt = require('prompt-sync')();
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//app.use(session({secret:"fingerpint"}))
public_users.post("/register", (req,res) => {
   //Write your code here
   const username = req.body.username;
   const password = req.body.password;
     if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });


// Get the book list available in the shop
public_users.get('/',function (req, res) {
let myPromise = new Promise((resolve,reject) => {
    resolve("List of books ");
    res.send(JSON.stringify(books,null,4));
    })
myPromise.then((successMessage) => {
    res.send(JSON.stringify("From Callback " + successMessage,null,4));
  })
});

// Get the book list available in the con axios
     // poner arriba const fs = require("fs");????????
  


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
		  const isbn = req.params.isbn;
		  let isbnbook = books[isbn]["isbn"];
		  let author = books[isbn]["author"];
		  let title = books[isbn]["title"];
		  let book = books[isbn]["isbn"];
		  if (book){
		  res.send(JSON.stringify("The requested book with isbn = "+isbnbook+ ";Autor: "+ author+ " and Title "+ title,null,4));  
		  }
		  else {res.send("Unable to find Book!");}
 });
    
// Get book details based on author    Task 3
public_users.get('/author/:author',function (req, res) {
		 //Write your code here
	const author = req.params.author;
	let autores="";
	for (var i = 1; i < 9; i++) {
	   	   if (author==books[i]["author"]) {autores+=books[i]["author"];isbn=i;}
	}	
		let isbnbook = books[isbn]["isbn"];
		let title = books[isbn]["title"];
		res.send(JSON.stringify("From the required author = "+autores+" there is title book: "+title+" and isbn= "+isbnbook,null,4));  
 });
%--------------------------------------------------------
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  ///Write your code here
    const title = req.params.title;
    let isbn="";
    for (var i = 1; i < 9; i++) {
	   	   if (title==books[i]["title"]) {isbn=i;}
	}
      res.send(JSON.stringify("From the required title = "+books[isbn]["title"]+" the author is "+books[isbn]["author"]+"  and the isbn of the book is= "+isbn,null,4));  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let libro = books[isbn]["review"];
  if (libro){
  res.send(JSON.stringify(libro,null,4));  // javi
  }
  else {res.send("The requested  book does not have data in its review!");}
 });

module.exports.general = public_users;

