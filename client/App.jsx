
import $ from 'jquery';
import 'styles/main.scss';
import TodoControllerView from 'pages/todoReact/todoController';
import project from 'pages/project';
import formValPortfolio from 'pages/formValPortfolio';
import funnySquares from 'pages/funnySquares';
import header from 'components/header';
import main from 'components/main';
import footer from 'components/footer';
import photoSearch from 'pages/photoSearch';
import landingPage from 'pages/landingPage';


$(function(){
  header.init();
  main.init(); 
  footer.init();  
  var url = window.location.pathname;

  switch (url){
    
    case '/pages/project.html':
      project.init();
    break;
    
    case '/pages/funnySquares.html':
      funnySquares.init();
    break;

    case '/pages/photoSearch.html':
      photoSearch.init();
    break;

    case '/pages/todo.html':
      var todoControllerView = new TodoControllerView();
    break;

    case '/pages/formValPortfolio.html':
      formValPortfolio.init();
    break;

    case '/pages/landingPage.html':
      landingPage.init();
    break;   

    case '/':
      // init the project javascript
      // home.init();
    break;

    default: break;  
  }
});
