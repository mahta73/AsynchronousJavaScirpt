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
