'use strict';

var App = (function App() {

  var newCallButton,
      newSmsButton,
      pickContactButton,
      pickPhotoButton,
      container;

  function init () {
    // Get the buttons and add a event listener for them
    newCallButton = document.getElementById('new-call');
    newSmsButton = document.getElementById('new-sms');
    pickContactButton = document.getElementById('pick-contact');
    pickPhotoButton = document.getElementById('pick-photo');

    container = document.querySelector('.container');

    newCallButton.addEventListener('click', handleClick);
    newSmsButton.addEventListener('click', handleClick);
    pickContactButton.addEventListener('click', handleClick);
    pickPhotoButton.addEventListener('click', handleClick);
  }

  // Setups the actions for our buttons
  function handleClick(evt) {
    var button = evt.target.id;

    switch(button) {
      case 'new-call':
        alert('Implement call activity');
      break;
      case 'new-sms':
        alert('Implement sms activity');
      break;
      case 'pick-contact':
        alert('Implement pick contact');
      break;
      case 'pick-photo':
        alert('Implement pick photo');
      break;
      default:
        alert('No action');
    }
  }

  // Utility functions

  // Given a mozContact object, show it contents
  // in our app
  function drawContact(contact) {

  }

  // Given an image in blob format, render
  // it on our app
  // Warning: this is for testing purposes,
  //   removing and creating always the image
  //   is not the effective way.
  function drawImage(blob) {
    // Clean any current content
    container.innerHTML = '';

    // Build an imagen
    var img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    img.onload = function() {
      URL.revokeObjectURL(this.src);
    };
    img.height = 150;
    img.width = 150;
    container.appendChild(img);
  }

  return {
    init: init
  };

})();

window.onload = App.init;