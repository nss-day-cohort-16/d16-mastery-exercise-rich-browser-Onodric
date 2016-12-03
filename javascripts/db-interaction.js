"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let firebase = require("./firebaseConfig");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

let userId;

let addID = function (data) {
console.log("addID called with: ", data);
  let tempId = Object.keys(data);
  // let newData = Object.keys(data);
  tempId.forEach( function(element, index) {
    data[element].id = element;
  });
  return data;
};

function getToys() {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `https://thrxtoys.firebaseio.com/toys.json`
    }).done(function(toyData){
      toyData = addID(toyData);
console.log("toyData retrieved known user: ", toyData);
      resolve(toyData);
    });
  });
}

// POST - Submits data to be processed to a specified resource. Takes one parameter.
function addToy(toyFormObj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://thrxtoys.firebaseio.com/toys.json",
      type: "POST",
      data: JSON.stringify(toyFormObj),
      dataType: 'json'
    }).done(function (toyId) {
console.log("added toy: ", toyId);
      resolve(toyId);
    });
  });
}

function deleToy(toyId) {
  console.log("  what is happening? delete: ", toyId);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://thrxtoys.firebaseio.com/toys/${toyId}.json`,
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
      url: `https://thrxtoys.firebaseio.com/toys/${toyId}.json`
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
function editToy(toyFormObj, toyId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://thrxtoys.firebaseio.com/Toys/${toyId}.json`,
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
  editToy
};
