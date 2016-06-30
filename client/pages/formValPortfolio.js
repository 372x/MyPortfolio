
import $ from 'jquery';

var app = {
  init: function(){
    app.bindEvents();
    app.submitForm();
  },

  bindEvents: function(){
    $('.btn').click(function(){
      $('form').show('slow', 500);
    });
  },

  submitForm: function(){
    $('.btn-submit').click(function(){
      $('form').hide('slow', 500);
    });
  }
};

module.exports = app;
