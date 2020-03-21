const arr = [23, 55, 33, 25, 64];
let myFunc = a => {
  console.log("too : " + a);
};
const arr2 = [...arr, 44, 1223];

myFunc(arr2[1]);
