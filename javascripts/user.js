"use strict";

let firebase = require("./firebaseConfig"),
  provider = new firebase.auth.GoogleAuthProvider(),
  currentUser = null;

//listen for changed state
firebase.auth().onAuthStateChanged(function(user){
  if (user){
    currentUser = user.uid;
// console.log("current user Logged in?", currentUser);
    $("#db-in").addClass("hide");
    $("#db-out").removeClass("hide");
  }else {
    currentUser = null;
// console.log("current user NOT logged in:", currentUser);
    $("#db-out").addClass("hide");
    $("#db-in").removeClass("hide");
  }
});

function logInGoogle() {
  // all firebase functions return a promise!! Add a then when called
  return firebase.auth().signInWithPopup(provider);
}

let createUser = function(userObj){
  return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);
};

let loginUser = function(userObj){
  return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
};

function logOut(){
  return firebase.auth().signOut();
}
function getUser(){
  return currentUser;
}

module.exports = {logInGoogle, logOut, getUser};