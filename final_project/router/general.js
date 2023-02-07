const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/* 	TASK 6:    Complete the code for registering a new user			*/
public_users.post("/register", (req,res) => {
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


/*   	TASK 1  Get the book list available in the shop				*/
public_users.get('/',function (req, res) {
	res.send(JSON.stringify(books,null,4));  
});
/* 	TASK 10 - Get the book list available in the shop using promises    		*/
public_users.get('/books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Promise for Task 10 resolved"));
        });
  
/* 	TASK 2 Get book details based on ISBN						*/
public_users.get('/isbn/:isbn',function (req, res) {
		  const isbn = req.params.isbn;
		  res.send(JSON.stringify(books[isbn], null, 4));
 });

    
/*  	TASK 3 Get book details based on author    					*/
public_users.get('/author/:author',function (req, res) {
	//Write your code here
	let author = req.params.author;
	let filter_books=[];
	for (var i = 1; i < 11; i++) {
	if (author==books[i]["author"]) {
	    filter_books.push(i);
        }}
        let author_books=[];for (var i = 0; i < filter_books.length; i++) { author_books.push(books[filter_books[i]]);}
        res.send(JSON.stringify(author_books, null, 4));
 });

 /*  	TASK 4 Get  books details based on title					*/
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    for (var i = 1; i < 11; i++) {
	   if (title==books[i]["title"]) {isbn=i;}
	}
    res.send(JSON.stringify(books[isbn], null, 4)); 
});

/*   	TASK 5: Complete the code for getting book reviews				*/
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let reviews_isbn = books[isbn]["review"];
  if (reviews_isbn){
  res.send(JSON.stringify(reviews_isbn,null,4)); 
  }
  else {res.send("There are no published reviews of this book.");}
 });
/* 	TASK 10 - Get the book list available in the shop using promises     */
public_users.get('/books',function (req, res) {
    	const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books, null, 4)));
      		});
     	 get_books.then(() => console.log("Promise for Task 10 resolved"));
});

/* 	TASK 11: Get book details based on ISBN  using Promise callbacks  	*/
public_users.get('/books/isbn/:isbn',function (req, res) {
	const isbn = req.params.isbn;
	const get_books_isbn = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books[isbn], null, 4)));
      });
       get_books_isbn.then(() => console.log("Promise for Task 11 resolved"));
        });
/* 	TASK 12: Get book details based on author using Promise callbacks 			*/
public_users.get('/books/author/:author',function (req, res) {
	const author = req.params.author;
	 for (var i = 1; i < 11; i++) {if (author==books[i]["author"]) {isbn=i;}}
	 const get_books_author = new Promise((resolve, reject) => {
         resolve(res.send(JSON.stringify(books[isbn], null, 4)));
        });
        get_books_author.then(() => console.log("Promise for Task 12 resolved"));
        });

/* 	TASK 13: Get book details based  on Title  using Promise callbacks 		*/
public_users.get('/books/title/:title',function (req, res) {
  ///Write your code here
    const title = req.params.title;
    for (var i = 1; i < 11; i++) {if (title==books[i]["title"]) {isbn=i;}}
    const get_books_title = new Promise((resolve, reject) => {
         resolve(res.send(JSON.stringify(books[isbn], null, 4)));
        });
        get_books_title.then(() => console.log("Promise for Task 13 resolved"));
        });     
module.exports.general = public_users;
