"use strict";

var arr = [23, 55, 33, 25, 64];

var myFunc = function myFunc(a) {
  console.log("too : " + a);
};

var arr2 = [].concat(arr, [44, 1223]);
myFunc(arr2[1]);