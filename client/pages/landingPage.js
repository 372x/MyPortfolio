
import $ from 'jquery';

var app = {
  init: function(){
    app.bindEvents();
    app.validateForm();
  },

  bindEvents: function(){
    $('.btn-show-form').click(function(){
      $('form').toggle(250);
    });
  },

  validateForm: function(){
    $('form').submit(function(){
      $('.error').empty();
      var firstName = $('#first').val();
      var lastName = $('#last').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var passwordConfirm = $('#password-confirm').val();
      var zip = $('#zipcode').val();

      var reName = /^[a-zA-Z]{1,}[a-zA-Z\ \-]{1,}$/;
      var OKfirstName = reName.exec(firstName);
      var OKlastName = reName.exec(lastName);

      var reEmail = /^[a-zA-Z0-9\-]+@[a-zA-Z0-9\-]+[\.][a-zA-Z]{2,}$/;
      var OKemail = reEmail.exec(email);
      
      var rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?])[A-Za-z\d@$!#%*?]{8,}$/;
      var OKpassword = rePassword.exec(password);

      var reZip = /^[0-9]{5}$/;
      var OKzip = reZip.exec(zip);
      
      if (firstName === '') {
        $('.first-name-error').text('Please enter your first name.');
      } else if (!OKfirstName) {
        $('.first-name-error').text('Please enter a valid name.');
      }
      
      if (lastName === '') {
        $('.last-name-error').text('Please enter your last name.');
      } else if (!OKlastName) {
        $('.last-name-error').text('Please enter a valid name.');
      } 
     
      if (email === '') {
        $('.email-error').text('Please enter your email address.');
      } else if (!OKemail) {
        $('.email-error').text('Please enter a valid email address.');  
      }
     
      if (password === '') {
        $('.password-error').text('Please enter your password.');
      } else if (password.length < 8) {
        $('.password-error').text('Short passwords are easy to guess. Try one with at least 8 characters.');
      } else if (!OKpassword) {
        $('.password-error').text('Please include at least one number, one lowercase letter, one uppercase letter, and one of these special characters: $ # @ % * & ! ?');
      }

      if (password !== passwordConfirm && password.length >= 8 && OKpassword) {
        $('.password-confirm-error').text('This does not match your password.');
      }

      if (!OKzip && zip !== '') {
        $('.zipcode-name-error').text('Please enter a five-digit zip code.');
      }

      return false;   
    });
  }
};

module.exports = app;
