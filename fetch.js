/*
  FETCH API
    The fetch API is an inteface built into the browser that allows users to make
    network requests.

  The fetch() method will return a promise that will hold a fetch response, and
  from that response you can obtain the data that you are trying to receive.

  THE FETCH() METHOD RETURNS A PROMISE THAT CONTAINS A RESPONSE OBJECT.
*/

fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(function(result){
       return result.json()
    })
    .then(function(result){
       console.log(result);
       //logs Object {completed: false, id: 1, title: "delectus aut autem", userId: 1}
    })
    .catch(function(err){
        console.log(err);
});

// HANDDING FETCH RESPONSES

// checking the response status

// fetching a bad url
fetch("https://jsonplaceholder.typicode.com/bad_url/1")
  .then( response => {
    return Promise.reject(Error(`The server responded with a status of ${response.status}`));
  })
  .catch( err => console.log(err));

/*
  FETCH INIT OBJECT
    The fetch() method can also take in an optional init object. This object
    applies custom settings to the Fetch request.

  The method attribute is a string that is used to specify the HTTP request method type.

  Here is a list of some commonly used method types:

  Get - used to retrieve an existing data resource
  Head - used to retrieve HTTP headers
  Post - used to create a new data resource
  Put - used to create a new data resource or modify an existing data resource
  Delete - used to delete a data resource

  Headers
  The headers attribute is used to add more information about the resource being
  fetched or the client doing the fetching. A Headers object can be created using
  the new Headers() constructor and individual headers can be added to the Headers
  object through the append() method.

  The mode attribute is a string that is used to determine whether or not the
  Fetch request can fetch resources from different servers.

  same-origin - the Fetch request can only fetch resources from the same server
  cors (cross origin HTTP request) - the Fetch request can fetch resources
  from different servers
*/

let initObject = {
  method: 'POST',
  headers: new Headers(),
  mode: 'cors',
  body: "{}"
};

fetch("https://jsonplaceholder.typicode.com/posts", initObject)
  .then( response => response.json())
  .then( response => console.log(response))
  .catch ( err => console.log(err));

/*
  The fetch() method can take in a Request object instead of a URL and init object.
  The Request constructor takes in the same parameters as the fetch() method.
  Request objects are used because they make fetch requests a bit cleaner and
  also offer a bit more control;
*/

let initOBJECT = {
  method: 'GET',
  headers: new Headers(),
  mode: 'cors',
  // body: JSON.stringify({})
};

// create a new request object using URL and init object
let request = new Request("https://jsonplaceholder.typicode.com/posts", initOBJECT);

fetch(request)
  .then( response => response.json())
  .then( responseJSON => {
    for (let key in responseJSON) {
      console.log(key, responseJSON[key].title);
    }
  })
  .catch( err => console.log(err));

  /*
    REUSING REQUEST OBJECTS
      If a Request object is used more than once in a Fetch request that involves
      bodies (POST, PUT) it will throw an error.
      However, Request objects can be used more than once in Fetch requests that
      don't involve bodies(Head,Get).
  */
