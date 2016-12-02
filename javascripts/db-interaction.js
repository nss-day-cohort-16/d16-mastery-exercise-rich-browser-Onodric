"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let firebase = require("./firebaseConfig");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getToys(user) {
  return new Promise(function(resolve, reject){
    $.ajax({
// notice the songs.json. This tells firebase what key you want, and what format you need it in!      
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs.json?orderBy="uid"&equalTo="${user}"`
    }).done(function(toyData){
      resolve(toyData);
    });
  });
}

// POST - Submits data to be processed to a specified resource. Takes one parameter.
function addToy(toyFormObj) {
  console.log("  what is happening? addsong: ", toyFormObj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://musichistorydemo-7f1ee.firebaseio.com/songs.json",
      type: "POST",
      data: JSON.stringify(toyFormObj),
      dataType: 'json'
    }).done(function (toyId) {
      resolve(toyId);
    });
  });
}

function deleToy(toyId) {
  console.log("  what is happening? delete: ", toyId);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs/${toyId}.json`,
      method: "DELETE"
    }).done(function (data) {
      resolve();
    });
  });
}

// GET - Requests/read data from a specified resource
function getToy(toyId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs/${toyId}.json`
    }).done(function (toyData) {
      resolve(toyData);
    }).fail(function (error) {
      reject(error);
    });
    }
  );
}

// PUT - Update data to a specified resource. Takes two parameters.
// USE PATCH!!!
function editSong(toyFormObj, toyId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://musichistorydemo-7f1ee.firebaseio.com/songs/${toyId}.json`,
      type: 'PUT',
      data: JSON.stringify(toyFormObj)
    }).done(function (data) {
      resolve(data);
    });
  });
}

module.exports = {
  getToys,
  addToy,
  getToy,
  deleToy,
  editSong
};
