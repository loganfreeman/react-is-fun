import _ from 'underscore';
import * as utils from './utils';

export {
  makeSudoku,
  solvePuzzle,
  makePuzzle,
  axisfor,
  allowed
}

function makeSudoku() {
  return makePuzzle(solvePuzzle(utils.makeArray(81, null)));
}

function allowed(board, pos) {
  let bits = 511;

  for (let axis = 0; axis < 3; axis++) {
    let x = axisfor(pos, axis);
    bits = bits & axismissing(board, x, axis);
  }

  return utils.listbits(bits);
}

function solvePuzzle(board) {
  return solveBoard(board).answer;
}

function solveBoard(original) {
  let board = [].concat(original);
  let guesses = deduce(board);

  if (guesses === null) {
    return {
      state: [],
      answer: board
    };
  }

  let track = [{
    guesses: guesses,
    count: 0,
    board: board
  }];
  return solveNext(track);
}

// board: array of numbers, size of array 81, contains solved sudoku puzzle
function makePuzzle(board) {
  let puzzle = [];
  let deduced = utils.makeArray(81, null);
  let order = _.range(81);

  utils.shuffleArray(order);

  for (let i = 0; i < order.length; i++) {
    let pos = order[i];

    if (deduced[pos] === null) {
      puzzle.push({
        pos: pos,
        num: board[pos]
      });
      deduced[pos] = board[pos];
      deduce(deduced);
    }
  }

  utils.shuffleArray(puzzle);

  for (let i = puzzle.length - 1; i >= 0; i--) {
    let e = puzzle[i];
    utils.removeElement(puzzle, i, null);

    let rating = checkPuzzle(boardforentries(puzzle), board);
    if (rating === -1) {
      puzzle.push(e);
    }
  }

  return boardforentries(puzzle);

}


function boardforentries(entries) {
  let board = _.map(_.range(81), function(val, key) {
    return null;
  });

  for (let i = 0; i < entries.length; i++) {
    let item = entries[i];
    let pos = item.pos;
    let num = item.num;

    board[pos] = num;
  }

  return board;
}

function boardMatches(b1, b2) {
  for (let i = 0; i < 81; i++) {
    if (b1[i] !== b2[i]) {
      return false;
    }
  }

  return true;
}

function checkPuzzle(puzzle, board) {
  if (board === undefined) {
    board = null;
  }

  let tuple1 = solveBoard(puzzle);
  if (tuple1.answer === null) {
    return -1;
  }

  if (board !== null && boardMatches(board, tuple1.answer) === false) {
    return -1;
  }

  let difficulty = tuple1.state.length;
  let tuple2 = solveNext(tuple1.state);

  if (tuple2.answer !== null) {
    return -1;
  }

  return difficulty;
}

function solveNext(remembered) {
  while (remembered.length > 0) {
    let tuple1 = remembered.pop();

    if (tuple1.count >= tuple1.guesses.length) {
      continue;
    }

    remembered.push({
      guesses: tuple1.guesses,
      count: tuple1.count + 1,
      board: tuple1.board
    });
    let workspace = [].concat(tuple1.board);
    let tuple2 = tuple1.guesses[tuple1.count];

    workspace[tuple2.pos] = tuple2.num;

    let guesses = deduce(workspace);

    if (guesses === null) {
      return {
        state: remembered,
        answer: workspace
      };
    }

    remembered.push({
      guesses: guesses,
      count: 0,
      board: workspace
    });
  }

  return {
    state: [],
    answer: null
  };
}

function deduce(board) {
  while (true) {
    let stuck = true;
    let guess = null;
    let count = 0;

    // fill in any spots determined by direct conflicts
    let tuple1 = figurebits(board);
    let allowed = tuple1.allowed;
    let needed = tuple1.needed;

    for (let pos = 0; pos < 81; pos++) {
      if (board[pos] === null) {
        let numbers = utils.listbits(allowed[pos]);
        if (numbers.length === 0) {
          return [];
        } else if (numbers.length === 1) {
          board[pos] = numbers[0];
          stuck = false;
        } else if (stuck === true) {
          let t = _.map(numbers, function(val, key) {
            return {
              pos: pos,
              num: val
            };
          });

          let tuple2 = pickbetter(guess, count, t);
          guess = tuple2.guess;
          count = tuple2.count;
        }
      }
    }

    if (stuck === false) {
      let tuple3 = figurebits(board);
      allowed = tuple3.allowed;
      needed = tuple3.needed;
    }

    // fill in any spots determined by elimination of other locations
    for (let axis = 0; axis < 3; axis++) {
      for (let x = 0; x < 9; x++) {
        let numbers = utils.listbits(needed[axis * 9 + x]);

        for (let i = 0; i < numbers.length; i++) {
          let n = numbers[i];
          let bit = 1 << n;
          let spots = [];

          for (let y = 0; y < 9; y++) {
            let pos = posfor(x, y, axis);
            if (allowed[pos] & bit) {
              spots.push(pos);
            }
          }

          if (spots.length === 0) {
            return [];
          } else if (spots.length === 1) {
            board[spots[0]] = n;
            stuck = false;
          } else if (stuck) {
            let t = _.map(spots, function(val, key) {
              return {
                pos: val,
                num: n
              };
            });

            let tuple4 = pickbetter(guess, count, t);
            guess = tuple4.guess;
            count = tuple4.count;
          }
        }
      }
    }

    if (stuck === true) {
      if (guess !== null) {
        utils.shuffleArray(guess);
      }

      return guess;
    }
  }
}


//
function pickbetter(b, c, t) {
  if (b === null || t.length < b.length) {
    return {
      guess: t,
      count: 1
    };
  } else if (t.length > b.length) {
    return {
      guess: b,
      count: c
    };
  } else if (utils.randomInt(c) === 0) {
    return {
      guess: t,
      count: c + 1
    };
  }

  return {
    guess: b,
    count: c + 1
  };
}


function figurebits(board) {
  let needed = [];
  let allowed = _.map(board, function(val, key) {
    return val === null ? 511 : 0;
  }, []);

  // for three axis, a total of 27 axis to check
  // x has different meaning depending on the axis,
  // for example, when the axis is row, its means each row
  // when the axis is column, it means each column,
  // when the axis is each block, it means each 9 * 9 block
  for (let axis = 0; axis < 3; axis++) {
    for (let x = 0; x < 9; x++) {
      let bits = axismissing(board, x, axis);
      needed.push(bits);
      // for all 9 places
      for (let y = 0; y < 9; y++) {
        let pos = posfor(x, y, axis);
        allowed[pos] = allowed[pos] & bits;
      }
    }
  }

  return {
    allowed: allowed,
    needed: needed
  };
}


// x: a particular number in an axis
// check if a particular axis is missing numbers
function axismissing(board, x, axis) {
  let bits = 0;
  // for all 9 places
  for (let y = 0; y < 9; y++) {
    let e = board[posfor(x, y, axis)];

    if (e !== null) {
      bits |= 1 << e;
    }
  }

  return 511 ^ bits;
}

// three axis
function posfor(x, y, axis) {
  if (axis === undefined) {
    axis = 0;
  }

  if (axis === 0) {
    return x * 9 + y;
  } else if (axis === 1) {
    return y * 9 + x;
  }

  return ([0, 3, 6, 27, 30, 33, 54, 57, 60][x] + [0, 1, 2, 9, 10, 11, 18, 19, 20][y]);
}

function axisfor(pos, axis) {
  if (axis === 0) {
    return Math.floor(pos / 9);
  } else if (axis === 1) {
    return pos % 9;
  }

  return Math.floor(pos / 27) * 3 + Math.floor(pos / 3) % 3;
}

function boardMatched(b1, b2) {
  for (let i = 0; i < 81; i++) {
    if (b1[i] !== b2[i]) {
      return false;
    }
  }
  return true;
}
