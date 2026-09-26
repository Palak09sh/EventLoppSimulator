export const examples = {
  "Basic Call Stack": `function first() {
  console.log("A");
}

function second() {
  console.log("B");
}

first();
second();`,

  "setTimeout": `console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");`,

  "Promise": `console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");`,

  "Promise vs setTimeout": `console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");`,

  "Nested Functions": `function outer() {
  console.log("Outer");

  function inner() {
    console.log("Inner");
  }

  inner();
}

outer();`,
};