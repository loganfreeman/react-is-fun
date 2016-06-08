import {List,Map,fromJS} from 'immutable';
import _ from 'underscore';

export {getRandomInt, makeArray, shuffleArray}
function getRandomInt(min, max) {
  return Math.floor( Math.random() * ( max + 1 ) ) + min;
}


function makeArray(length, value) {
  return _.map(_.range(length), (val, key) => value);
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
