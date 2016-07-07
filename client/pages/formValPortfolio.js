
import $ from 'jquery';

var app = {
  init: function(){
    app.bindEvents();
//  app.submitForm();
    app.validateForm();
  },

  bindEvents: function(){
    $('.btn').click(function(){
      $('form').show('slow', 500);
    });
  },

/* remove the submit-form-button click that hid form on submit:
  submitForm: function(){
    $('.btn-submit').click(function(){
      $('form').hide('slow', 500);
    });
  }  */

// add form validation code from codepen:
  validateForm: function(){
    $('form').submit(function(){
      $('p').empty();
      var firstName = $('#first').val();
      var lastName = $('#last').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var passwordConfirm = $('#password-confirm').val();
      var zip = $('#zipcode').val();
//    var phone = $('#_____').val();  // need to add to HTML if going to use

      var reName = /^[a-zA-Z]{1,40}[a-zA-Z--]{1,40}$/; // OK!  add in a space?
      var OKfirstName = reName.exec(firstName);
      var OKlastName = reName.exec(lastName);

      var reEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+[\.]+[a-zA-Z]{2,40}$/;  // OK! OR: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/; check this regex
      var OKemail = reEmail.exec(email);
      
      var rePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;  // OK! -- at least 8 characters that include at least one number, one lowercase and one uppercase letter
      // OR: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;  // includes special characters but not >
      // OR: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;  /^[0-9]{8}/;
      var OKpassword = rePassword.exec(password);

      var reZip = /^[0-9]{5}$/;  // OK!
      var OKzip = reZip.exec(zip);

/*    telephone field too much?  too many fields?:
      var rePhone = /\d{3}[\-]\d{3}[\-]\d{4}/;  // /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/ == a different phone regex
      var OKphone = rePhone.exec(phone);   // need to add phone variable above and to HTML
*/      
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
        $('.password-error').text('Short passwords are easy to guess.  Try one with at least 8 characters.');
      } else if (!OKpassword) {
        $('.password-error').text('Please include at least one number, one lowercase letter, and one uppercase letter.');
      }
//      $('.password-error').text('Please use letters, numbers, and special characters of WHAT.');
//    }

// If PW has to be OKpassword to remove pw error message, then OKpw doesn't have to be part of confirm pw piece.
// Then how keep pwConfim error message from showing before user reaches this field?      
// Maybe use keyEnter/ keyUp/ keyDown on passwordConfirm field to show the error message, not the password keyEnter
      if (password !== passwordConfirm && password.length >= 8) {
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

// loop empty field validation?
// pwConfirm error only on enter/tab key?
