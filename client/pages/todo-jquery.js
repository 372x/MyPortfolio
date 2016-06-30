
// import $ from 'jquery';   // ES6 way to get jquery library
var $ = require('jquery');    // ES5 way of doing this
// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap');  // bootstrap js

import _ from 'underscore';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'templates/todoItem.html';  // some might need html! in front of templates/todoItem.html

// on document load
// $(function(){

// Data Model ==> our database
var savedData = lscache.get('todos');
var todos; // = [    // to do's always start with an empty array ==> var todos = [];
if (savedData === null) {
  todos = [];
} else {
  todos = savedData;
  // debugger;
} // { title: "todo 1", completed: true },  // title & completed match the HTML in the template
 // { title: "todo 2", completed: false },
 // { title: "todo 3", completed: false }
// ];


//  Application
var template; // initially undefined; var scopes the template; want var template outside var app
var app = {   // this whole thing is a property with two properties of init and render; init sets things up; render renders the HTML; want to separate individual actions so modular;  the curly brackets means it's an object.
  // a function is a repository of code that will be executed later.  When you call the function, you are calling up the repository of code to run it at that time.
  // want to keep your functions samll and modular
  // when you create a function, you use the curly brackets to store the code and creat scope
 //  e.g. var test - function(){}  sets up the funtion;  test(); is what calls the function
  // var app = {
   //    x: 4,  // this in js is x=4;  it's an object to call this function app.test();
//  }
  init: function(){   // init is a name we picked, it's a best practice terming approach
    app.compileTemplates();  // we set all these terms ourselves, app, compileTemplates
    app.render();  // defined next, still all within var app = {}
  },
  render: function(){   
    // render the todos
    lscache.set('todos', todos);
    var todoHtml = _.map(todos, function(todo){  // = _.map(todos, function(todo) replaces = todos(function(todo)
      return template(todo);  // a function we pass another function into
    });  // get an array as the result i.e. return ==>same as this: var iterator = function (todo){return template(todo);};  ==> iterating through an array for each ul in the template; each iteration/item in the list creates HTML, which is stored as todoHtml
    app.unbindEvents();  
    $('ul.list-group').html(todoHtml.join(''));
    app.bindEvents();
  },
  compileTemplates: function(){
    // template = $('[type="te // this sets 'template' to a jQuery selector, names the HTML template
    template = Handlebars.compile(rawTemplate);  // Handlebars.compile is a Handlebars command
  },
  unbindEvents: function(){
    $('.list-group-item').off();  // turns stuff off, i.e. clears everything
    $('.add-todo-container button').off();  // need to bind and unbind in Backbone, but not in React
    $('input[type="checkbox"]').off();
    $('.list-group-item button').off();
    $('.title-edit input').off();
  },  // before we fill the DOM with the new HTML, unbind events so all clear
  bindEvents: function(){  // this fills the DOM with the new HTML
    app.bindHoverEvents();
    app.bindCheckboxEvents();
    app.bindAddTodoEvents();
    app.bindRemoveTodoEvents();
    app.bindEditTodoEvents();
  },
  bindHoverEvents: function(){
    var $items = $('.list-group-item');
    $items.on('mouseover', function(){
      $(this).addClass('list-group-item-success');  // addClass and removeClass are jQ ==> $ is the clue
    });  // 'this' is js, means the thing we're currently operation on, easier way to do event handlers, event.which is what key was clicked on, 
    $items.on('mouseout', function(){ // 'on' is a jQuery word, mouseout, mouseover are jQuery selectors
      $(this).removeClass('list-group-item-success');
    });
  },
  bindCheckboxEvents: function(){
    var $checkboxes = $('input[type="checkbox"]');  // jquery, selects all the checkbox types from HTML template
    // console.log($checkboxes.length);
    $checkboxes.on('change', function(){  // 'on' is a jQ thing, and 'change' is an event it understands
      var wasChecked = $(this).is(':checked');   // ':checked' is the CSS, like :hover  :before
      if (!wasChecked){
        $(this).parent().parent().removeClass('disabled');
      } else {
        $(this).parent().parent().addClass('disabled');
      }
    });  
  },
  bindAddTodoEvents: function(){
    $('.add-todo-container button').on('click', function(){
      var newTodoTitle = $('.add-todo-container input').val();
      if (_.isString(newTodoTitle) && newTodoTitle.length > 2) {  // have to be sure its a string first, before check the length, otherwise could get a 'null' returned  ==> $.type is a jQ thing
        // if (_.isString(newTodoTitle) replaces if ($.type(newTodoTitle) === 'string' in the if statement
        var newTodoObject = {
          id: todos.length,  // '.length' here is this todo's positio in array
          title: newTodoTitle,
          completed: false
        };
        todos.push(newTodoObject);   // push is js, means add new object to data model array
        $('.add-todo-container input').val('');   // the val('') sets the value to nothing, ie it puts the entry box empty again; if no quotes, it gets the value
        app.render();
      }
    });
  },
  bindRemoveTodoEvents: function(){
    $('.list-group-item button').on('click', function(){
      // remove todo item based on index in array rather than title
      var index = $(this).parent().parent().index();
      todos.splice(index, 1);
      app.render();
    });
  },
  bindEditTodoEvents: function(){
    $('.title').on('click', function(){
      var $parent = $(this).parent();  // the 'this' refers to what was clicked on
      $parent.find('.title').addClass('hidden');  // find in the parent for the title we want

      $parent.find('.title-edit').removeClass('hidden');
    });
    $('.title-edit input').on('keypress', function(event){     // this is an event handler, something happens when event happens; go to title-edit in the html and find the input tag inside that
      var key = event.which;      // the key pressed is stored either as keyCode or 'which' [depends on browser]
      // if they hit the enter key  // the enter key is 13; a number for every key. If more than one key is enter, then: if (key === 13 || key === 108)
      if (key === 13) {
        var newTitle = $(this).val();
        // update the title in our model [model is where all the data is]
        var editId = $(this).attr('data-id');  // attr reads the value of data-id
        editId = parseInt(editId, 10);   // the 10 puts it in base 10, parseInt converts string to number
        var editTodo = _.filter(todos, function(todo){  // filter returns an array that passes the filter test
          if (todo.id === editId) {  // todo.id is the position of the todo in the array
            return true;
          }
          return false;
        });
        editTodo[0].title = newTitle;
        app.render();
      }        
    }); 
  }
};
 
module.exports = app;  // replaces app.init(); -- exports code but doesn't run it, it's run on app.jsx
