/*
  GENERATORS:
    Generators are functions that can be paused and resumed.
    Generators can send out values when pausing and take in values when resuming.
    Generators are important because they allow asynchronous functions to written
    like normal synchronous functions
*/

function* generatorFunction() {
  console.log('started');
  yield 'a'; //pauses the generator and sends out a value of 'a'
  console.log('passed first yeild');
  yield;     //pauses the generator and sends out an undefined value
  console.log('passed second yeild');
  yield 123; //pauses the generator and sends out a value of 123
  console.log('passed third yeild');

  /*
    Generator Functions have an optional return value.
    Omitting the return value is equivalent to returning an undefined value.
    The return value of Generator functions is often left unused.
  */
  return "finished"; //return value of "finished"
}

// create generator object
let generatorObject = generatorFunction();

let first = generatorObject.next();

console.log(typeof first);
console.log(first.done);
console.log(first.value);

let second = generatorObject.next();

console.log(typeof second);
console.log(second.done);
console.log(second.value);

let third = generatorObject.next();

console.log(typeof third);
console.log(third.done);
console.log(third.value);

let forth = generatorObject.next();

console.log(typeof forth);
console.log(forth.done);
console.log(forth.value);

/*
  Throwing errors within the generator function
*/

function* secondGeneratorFunc() {
  console.log('one');
  yield 'one';
  console.log('two');
  yield 'two';
  throw new Error("err thrown by generator function");
  console.log('three');
  yield 'three';
  console.log('four');
  yield 'four';
  console.log('last round');
  return 'finished';
}

// create generator object
let secondGeneratorOb = secondGeneratorFunc();

try {
  let a = secondGeneratorOb.next();
  console.log(`${a.done + ' ' + a.value} \n`);
  let b = secondGeneratorOb.next();
  console.log(`${b.done + ' ' + b.value} \n`);
  let c = secondGeneratorOb.next();
  console.log(`${c.done + ' ' + c.value} \n`);
  let d = secondGeneratorOb.next();
  console.log(`${d.done + ' ' + d.value} \n`);
  let e = secondGeneratorOb.next();
  console.log(`${e.done + ' ' + e.value} \n`);
} catch (err) {
  console.log(err.message);
}

/*
  Yielding to other Generators
*/

function* firstGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';

  return "done with firstGenerator()!"
}

function* secondGenerator() {
  yield 1;
  yield* genFuncA(); // contains iterable [a,b,c]
  yield 2;
  yield 3;

  return "done with secondGenerator()!";
}
