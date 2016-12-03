"use strict";

let User = require('./user'),
    Handlebars = require('hbsfy/runtime'),
    FbThing = require('./db-interaction'),
// Templates
    toyTemplate = require('../templates/toyGrid.hbs'),
    modalTemplate = require('../templates/toyModal.hbs');
// Partials
Handlebars.registerPartial("addToy", require('../templates/partials/addToy.hbs'));

let toys = {};
let user = null;

function events () {
  //SET ALL OUR EVENTS HERE
  $('#db-in').click(function(event){
    User.logInGoogle()
    .then(function (data) {
      refreshPage();
    });
  });

  $('#db-out').click(function(event){
    User.logOut();
  });

  $('#addToy').click(()=>{
    let newToy = {
      "name": $('#addToyName').val(),
      "price": $('#addToyPrice').val(),
      "imgUrl": $('#addToyImg').val(),
      "desc": $('#addToyDesc').val(),
      "id": toys.toys.length,
    };
    FbThing.addToy(newToy)
    .then(()=>{
      makeThisPage(newToy);
      $('#modalAddToy').modal('hide');
    });
  });

  $('.delete').click((event)=>{
    FbThing.deleToy(event.target.id)
    .then(()=>{
      $(event.target).closest('.toyCard').remove();
    });
  });

  $('.deleteModal').click((event)=>{
    FbThing.deleToy(event.target.id)
    .then(()=>{
      $(event.target).closest('.toyCard').remove();
    });
  });

}

function makeThisPage(data){
  let toyGrid = toyTemplate(data);
  let toyModal = modalTemplate(data);
  $('#wrapper').append(toyGrid);
  $('#wrapper').append(toyModal);
  events();
}

let refreshPage = ()=>{
  FbThing.getToys()
  .then(function(data){
    toys = {toys: data};
    makeThisPage(toys);
  });
};

refreshPage();

// # Toy Consignment Shop

// You are going to create an application for a consignment store specializing in children's toys. Use Google image search to find some toys for your store.

// ## SASS Automation

// DONE

// ## Firebase Structure

// DONE

// ### Toy Data

// DONE

// ## Views

// DONE

// ### List all toys

// When viewing all toys, provide a text box on the screen that will allow the user to filter the toys on the product name. Use Bootstrap for laying the toys out in a grid.

// ### View individual toy details

// DONE

// ### Add / delete toy

// DONE

// You will also need to add a button to each toy that allows the user to delete it from the list and from Firebase.

// ## Stretch goals
// 1. Add a form for editing a toy and saving the changes.   
// 2. Create a form for registering/logging in a user. 
// 3. When the signed-in user adds a toy to Firebase, save the user id to the toy. 
// 4. Allow the user to view only toys he/she added to the db.  
