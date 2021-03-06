
import $ from 'jquery';
import _ from 'underscore';
import rawTemplate from 'templates/funnySquare.html';
import Handlebars from 'handlebars';

var template;
var app = {
  init: function(){
    template = Handlebars.compile(rawTemplate);
    app.render();
  },
  render: function(){
    var numberOfSquares = 6;
    var renderedHtml = '';
    _.times(numberOfSquares, function(index){
      renderedHtml += template({ id: index });
    });
    $('h1').after(renderedHtml);
  }
};

module.exports = app;
