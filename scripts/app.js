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
        newCall();
      break;
      case 'new-sms':
        newSMS();
      break;
      case 'pick-contact':
        pickContact();
      break;
      case 'pick-photo':
        pickPhoto();
      break;
      default:
        alert('No action');
    }
  }

  // New call
  function newCall() {
    var activity = new MozActivity({
      name: 'dial',
      data: {
        type: 'webtelephony/number',
        number: '12345678'
      }
    });

    activity.onsuccess = function() {
      // We don't do anything
    };

    activity.onerror = function() {
      alert('Unable to call');
    }
  };

  // New SMS
  function newSMS() {
    var activity = new MozActivity({
      name: 'new',
      data: {
        type: 'websms/sms',
        number: '12345678'
      }
    });

    activity.onsuccess = function() {
      // We don't do anything
    };

    activity.onerror = function() {
      alert('Unable to send SMS');
    }
  };

  // Pick contact
  function pickContact() {
    var activity = new MozActivity({
      name: 'pick',
      data: {
        type: 'webcontacts/tel'
      }
    });

    activity.onsuccess = function() {
      drawContact(this.result);
    };

    activity.onerror = function() {
      alert('Could not get a contact');
    };
  };

  // Pick photo
  function pickPhoto() {
    var activity = new MozActivity({
      name: 'pick',
      data: {
        type: 'image/png'
      }
    });

    activity.onsuccess = function() {
      drawImage(this.result.blob);
    };

    activity.onerror = function() {
      alert('Could not get an image');
    };
  };

  // Utility functions

  // Given a mozContact object, show it contents
  // in our app
  function drawContact(contact) {
    if (!contact) {
      return;
    }
    // Clean any current content
    container.innerHTML = '';
    var section = document.createElement('section');
    section.dataset.type = 'list';
    container.appendChild(section);

    // Create the structure for appending the information;
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    // Check if the contact has photo and add it if so
    if (contact.photo && contact.photo.length > 0) {
      var photo = document.createElement('aside');
      photo.classList.add('pack-end');
      var img = document.createElement('img');
      photo.appendChild(img);
      img.src = URL.createObjectURL(contact.photo[0]);
      img.onload = function () {
        URL.revokeObjectURL(this.src);
      };
      li.appendChild(photo);
    }

    // Add the name, if no, add 'no name'
    var name = document.createElement('p');
    name.textContent = contact.name && contact.name.length > 0 ?
     contact.name[0] : 'no name';
    li.appendChild(name);

    // If we have phone number add it as well
    if (contact.tel && contact.tel.length > 0) {
      var phone = document.createElement('p');
      phone.textContent = contact.tel[0].value;
      li.appendChild(phone);
    }

    ul.appendChild(li);

    section.appendChild(ul);
  }

  // Given an image in blob format, render
  // it on our app
  // Warning: this is for testing purposes,
  //   removing and creating always the image
  //   is not the effective way.
  function drawImage(blob) {
    if (!blob) {
      return;
    }
    // Clean any current content
    container.innerHTML = '';

    // Build an image
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