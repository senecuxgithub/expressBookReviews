const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


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


// TASK 1  Get the book list available in the shop				 TASK 1
public_users.get('/',function (req, res) {
	//Write your code here
	res.send(JSON.stringify(books,null,4));  
});
// TASK 10 - Get the book list available in the shop using promises           TASK 10
public_users.get('/books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Promise for Task 10 resolved"));
        });
  

// TASK 2 Get book details based on ISBN					TASK 2
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
    
// TASK 3 Get book details based on author    				TASK 3
public_users.get('/author/:author',function (req, res) {
		 //Write your code here
	let author = req.params.author;
	let autores='2';
for (var i = 1; i < 11; i++) {
	if (author==books[i]["author"]) {
	        isbn=i;
		let isbnbook = books[isbn]["isbn"];
		let title = books[isbn]["title"];
		let author = books[isbn]["author"];
		 autores=autores+'From the required author = '+author+' there is title book: '+title+' and isbn= '+isbn+'\\n';
        }}
        res.send(JSON.stringify(autores,null,4)); 
   
 });
%--------------------------------------------------------
//  TASK 4 Get  books details based on title					 TASK 4
public_users.get('/title/:title',function (req, res) {
  ///Write your code here
    const title = req.params.title;
    let isbn="";
    for (var i = 1; i < 11; i++) {
	   	   if (title==books[i]["title"]) {isbn=i;}
	}
      res.send(JSON.stringify("From the required title = "+books[isbn]["title"]+" the author is "+books[isbn]["author"]+"  and the isbn of the book is= "+isbn,null,4));  
});

//  TASK 5 Get  books details based on title					 TASK 5
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let libro = books[isbn]["review"];
  if (libro){
  res.send(JSON.stringify(libro,null,4)); 
  }
  else {res.send("The requested  book does not have data in its review!");}
 });

module.exports.general = public_users;

