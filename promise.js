/*
  Promises:
    promise is a cointainer that holds the eventual result of an asynchronous
    operation.
  Promise states:
    pending, fulfilled (fulfilled value), rejected (rejected value)

  The then() and catch() methods are used to handle the results of Promises once
  they have finished pending.
*/

let promise1 = new Promise( (resolve, reject) => {
  let isSuccessful = true;
  // isSuccessful will be set as the fulfillment value of the promise
  // rejection value becomes an Error object
  (isSuccessful ? resolve("suceessful") : reject(Error("Failure")));
});

promise1.then( fulfilledValue => {
  console.log(`promise1 fulfullment value: ${fulfilledValue}`);
}).catch( rejectionValue => {
  console.log(`promise1 rejection value: ${rejectionValue}`);
});

/*
  The new Promise() constructor is called to create a new promise.
  It takes in a callback function with arguments resolve and reject

  let promise = new Promise((resolve, reject) => {});
*/

/*
  Promise.resolve() is used to return a promise that is already fulfilled.
  Promise.reject() is used to return a promise that is already rejected.
  both of these methods can be called outside of new Promise() constructor.
*/

// A resolved promise with fulfillment value "already resolved"
let resolvedPromise = Promise.resolve("already resolved");
resolvedPromise.then( fulfilledValue => console.log(`resolvedPromise: ${fulfilledValue}`));

// A rejected promise with rejected value "already rejected"
let rejectedPromise = Promise.reject(Error("already rejected"));
rejectedPromise.catch( error => console.log(`rejectedPromise: ${error}`));

/*
  POINT:
    If another promise is passed in as an argument to resolve() then the new
    promise takes the fulfillment value of the passed in promise
*/

let firstPromise = Promise.resolve("already resolved");

let secondPromise = Promise.resolve(firstPromise);
secondPromise.then( fulfilledValue => console.log(`secondPromise: ${fulfilledValue}`));

/*
  POINT:
   The then() method can be called with a success callback and a failure callback

   promise.the( fulfilledValue => {

    }, rejectionValue => {

    });
*/

/*
  CALLING RETURN WITHIN THEN()
  Promise results can be transformed by calling the return statement within the
  then() callback. This will cause the then() method to return a new Promise
  with the transformed result.
*/

let promise2 = Promise.resolve("already resolved promise");

let promise3 = promise2.then( fulfilledValue => fulfilledValue + " !");

promise3.then( fulfilledValue => console.log(fulfilledValue));

// CHAINING TRANSFORMS

let promise4 = Promise.resolve([1, 2, 3, 4]);

promise4.then( fulfilledValue => {
  return fulfilledValue.map( element => element ** 2);
}).then( fulfilledValue => {
  return fulfilledValue.filter( element => element > 10);
}).then( fulfilledValue => {
  return fulfilledValue.toString() + "!!";
}).then ( fulfilledValue => {
  console.log(fulfilledValue);
  return fulfilledValue;
}).catch( error => console.log(error));

// SEQUENCING ASYNCHRONOUS OPERATIONS

/*
  Returning another promise within the then() callback will cause the then()
  method to return the returned promise
*/

let promise5 = Promise.resolve("already resolved");

let promise6 = promise5.then( fulfilledValue => {
  console.log(fulfilledValue);
  return Promise.resolve("12345");
});

promise6.then( fulfilledValue => console.log(fulfilledValue));

/*
  Promise.all()
    The Promise.all() method is used to process multiple Promises at the same
    time. The method takes in an ARRAY OF PROMISES and then waits for them to
    all to resolve. Once they have all finished resolving, an ARRAY OF RESULTS
    can be obtained using the then() method.
    If any of the promises reject, then the Promise.all() method will return the
    first rejected Promise.
*/

let promise7 = Promise.resolve("already resolved promise *1*");
let promise8 = Promise.resolve({name: 'mahta', gender: 'female'});
let promise9 = 100; // normal values work with Promise.all() too

let promisesArray = [promise7, promise8, promise9];
Promise.all(promisesArray)
  .then( fulfilledValue => console.log(fulfilledValue))
  .catch( err => console.log(err));

  /*
    Promise.race()
      The Promise.race() method takes in an ARRAY OF PROMISES and returns the
      result of the promise which resolves or rejects the fastest.

    The Promise.race() method can be used to limit the amount of time promises
    have to resolve.
  */

  let promise10 = new Promise ( (resolve, reject) => {
    setTimeout( () => {
      resolve("after 1 second");
    }, 1000);
  });

  let promise11 = new Promise ( (resolve, reject) => {
    setTimeout( () => {
      resolve("after 2 seconds");
    }, 2000);
  });

  Promise.race([promise10, promise11])
    .then( fulfilledValue => {
      console.log(fulfilledValue);
    })
    .catch( err => console.log(err));
