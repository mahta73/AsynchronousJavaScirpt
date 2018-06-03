"use strict"

/* GET TEXT EXAMPLE */
let getText = function() {
  fetch('../samples/sample.txt')
  .then( response => response.text())
  .then( responseText => {
    document.getElementById('output').textContent = responseText;
  })
  .catch(err => console.log(err));
};

document.getElementById('getText').addEventListener('click', getText);

/* GET JSON EXAMPLE */
let getUsers = function() {
  fetch('../samples/users.json')
  .then( response => response.json() )
  .then( responseJSON => {
    let outPut = '<h2>USERS: </h2>';

    responseJSON.forEach( currentElement => {
      outPut += `
        <ul>
          <li>ID: ${currentElement.id}</li>
          <li>NAME: ${currentElement.name}</li>
          <li>EMAIL: ${currentElement.email}</li>
        </ul>
      `;
    });

    document.getElementById('output').innerHTML = outPut;
  })
  .catch( err => console.log(err));
};

document.getElementById('getUsers').addEventListener('click', getUsers);

/* GET API DATA EXAMPLE*/
let getPosts = function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then( response => response.json() )
  .then( responseJSON => {
    let outPut = '<h2>POSTS: </h2>';

    responseJSON.forEach( currentElement => {
      outPut += `
        <div>
          <h3>${currentElement.title}</h3>
          <p>${currentElement.body}</p>
        </div>
      `;
    });

    document.getElementById('output').innerHTML = outPut;
  })
  .catch( err => console.log(err));
};

document.getElementById('getPosts').addEventListener('click', getPosts);

/* ADD POST EXAMPLE */
let addPost = function(event) {
  event.preventDefault(); // stop it from actually submitting to a file

  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    }),
  })
  .then ( response => response.json() )
  .then ( responseJSON => console.log(responseJSON) )
  .catch( err => console.log(err) );
};

document.getElementById('addPost').addEventListener('submit', addPost);
