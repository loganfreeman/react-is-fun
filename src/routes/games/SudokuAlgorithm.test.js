import * as algorithm from './SudokuAlgorithm';
import * as utils from './utils';
import {
  expect
} from 'chai';

describe('sudoku algorithm', () => {
  it('should get axis for pos', () => {
    let a, b, c;
    a = algorithm.axisfor(0, 0);
    b = algorithm.axisfor(0, 1);
    c = algorithm.axisfor(0, 2);
    expect(a).to.equal(0);
    expect(b).to.equal(0);
    expect(c).to.equal(0);

    a = algorithm.axisfor(80, 0);
    b = algorithm.axisfor(80, 1);
    c = algorithm.axisfor(80, 2);
    expect(a).to.equal(8);
    expect(b).to.equal(8);
    expect(c).to.equal(8);

    a = algorithm.axisfor(9, 0);
    b = algorithm.axisfor(9, 1);
    c = algorithm.axisfor(9, 2);
    expect(a).to.equal(1);
    expect(b).to.equal(0);
    expect(c).to.equal(0);

    a = algorithm.axisfor(3, 0);
    b = algorithm.axisfor(3, 1);
    c = algorithm.axisfor(3, 2);
    expect(a).to.equal(0);
    expect(b).to.equal(3);
    expect(c).to.equal(1);

    a = algorithm.axisfor(12, 0);
    b = algorithm.axisfor(12, 1);
    c = algorithm.axisfor(12, 2);
    expect(a).to.equal(1);
    expect(b).to.equal(3);
    expect(c).to.equal(1);

  })
})
