const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
let books = require("./booksdb.js");

const regd_users = express.Router();                        

let users = [];

const isValid = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser =  (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

//  TASK 8 Complete the code for adding or modifying a book review.					 TASK 8
 regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
     if (authenticatedUser(username,password)) {
       const isbn = req.params.isbn;
       let filtered_book=books[isbn]["isbn"];
       let filtered_reviews= books[isbn]["reviews"];
       let put_review = books[isbn]["reviews"][username];
       if (put_review) {
           books[isbn]["reviews"][username]="Good book";
       }
       else {books[isbn]["reviews"][username]="Very entertaining book";}
      return res.send(JSON.stringify("The user  "+username+ "  has added a review",null,4)); 
       } else {   return res.status(208).json({message: "Invalid Login. Check username and password"});}
  });
 //  TASK 9 Complete the code for deleting a book review.
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
       const isbn = req.params.isbn;
       let filtered_book=books[isbn]["isbn"];
       let filtered_reviews= books[isbn]["reviews"];
       let delet_review = books[isbn]["reviews"][username];
       if (delet_review) {
           delete books[isbn]["reviews"][username];
       }
      return res.send(JSON.stringify("The user  "+username+ "  has deleted their review",null,4)); 
         } else {   return res.status(208).json({message: "Invalid Login. Check username and password"});}
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
