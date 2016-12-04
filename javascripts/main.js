"use strict";

let User = require('./user'),
    Handlebars = require('hbsfy/runtime'),
    FbThing = require('./db-interaction'),
// Templates
    toyTemplate = require('../templates/toyGrid.hbs'),
    modalTemplate = require('../templates/toyModal.hbs');
// Partials
Handlebars.registerPartial("addToy", require('../templates/partials/addToy.hbs'));

let toys = {},
    searchTerms = [],
    user = null;

function events () {
  $('#db-in').click(function(event){
    User.logInGoogle()
    .then(function (data) {
      refreshPage();
    });
  });

  $('#db-out').click(function(event){
    User.logOut();
  });

  $('#searchToys').keyup(function(event) {
    let inputStr = event.target.value;
    displayMatching(inputStr);
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
      refreshPage();
      // makeThisPage({toys: newToy});
      // $('#modalAddToy').modal('hide');
    });
  });

  $('.delete').click((event)=>{
    FbThing.deleToy(event.currentTarget.id)
    .then(()=>{
      $(event.currentTarget).closest('.toyCard').remove();
    });
  });
}

function makeThisPage(data){
  let toyModal = modalTemplate(data);
  $('#wrapper').append(toyModal);
  let toyGrid = toyTemplate(data);
  $('#wrapper').append(toyGrid);
  events();
}

let refreshPage = ()=>{
  $('#wrapper').text('');
  FbThing.getToys()
  .then(function(data){
    let tempArr = Object.keys(data);
    for (let i = 0; i<tempArr.length; i++){
      searchTerms.push(data[tempArr[i]].name.toLowerCase().replace(" ", ""));
    }
    toys = {toys: data};
    makeThisPage(toys);
  });
};

let displayMatching = function (searchStr) {
  searchStr = searchStr.toLowerCase();
  // $('.toyCard h3').each(function(index, el) {
  //   searchTerms.push(el.innerText.toLowerCase().replace(" ", ""));
  // });
  $('.toyCard').hide();
  searchTerms.forEach( function(element, index) {
    if (element.includes(searchStr)){
      $($('.toyCard')[index]).show();
    }
  });
};

refreshPage();
