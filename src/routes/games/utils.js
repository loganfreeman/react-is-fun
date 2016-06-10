import {List,Map,fromJS} from 'immutable';
import _ from 'underscore';

export {getRandomInt, makeArray, shuffleArray, makeArray2, cloneArray, removeElement}
function getRandomInt(min, max) {
  return Math.floor( Math.random() * ( max + 1 - min ) ) + min;
}


function makeArray(length, value) {
  return _.map(_.range(length), (val, key) => value);
}

function makeArray2(length, fn) {
  return _.map(_.range(length), (val, key) => fn());
}
function cloneArray(original) {
  return Array.prototype.slice.call(original);
}
function shuffleArray(original) {
  for (var i = 0; i < original.length; i++) {
    var j = i;
    while (j === i) {
      j = Math.floor(Math.random() * original.length);
    }
    var contents = original[i];
    original[i] = original[j];
    original[j] = contents;
  }
  return original;
}
function removeElement(array, from, to) {
  let rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
}
