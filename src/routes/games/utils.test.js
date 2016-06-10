import * as utils from './utils';
import {
  expect
} from 'chai';
import _ from 'underscore';

describe('utils', () => {
  it('should get random int', () => {
    let i = utils.getRandomInt(10, 100);
    expect(i >= 10 && i <= 100).to.be.true;
  })
  it('should make array', () => {
    let a = utils.makeArray(10, 'a');
    a.forEach((item) => {
      expect(item).to.equal('a')
    })
    expect(a.length).to.equal(10)
  })
  it('should make array filled with random value', () => {
    let a = utils.makeArray2(10, () => utils.getRandomInt(1, 100))
    a.forEach((i) => {
      expect(i >= 1 && i <= 100).to.be.true;
    })
  })
  it('should shuffle array', () => {
    let a = utils.makeArray2(10, () => utils.getRandomInt(1, 100))
    let b = utils.cloneArray(a)
    utils.shuffleArray(a);
    let all = true;
    a.forEach((item, index) => {
      all = all && (item === b[index])
    })
    expect(all).not.to.be.true
  })
  it('should remove element from array', () => {
    let a = utils.makeArray2(10, () => utils.getRandomInt(1, 100))
    let b = utils.cloneArray(a)
    utils.removeElement(b, 3, 6);
    expect(b.length).to.equal(6);
    for(let i =0; i< 3; i++) {
      expect(b[i]).to.equal(a[i])
    }

    for(let i=6+1; i< 10; i++) {
      expect(b[i-4]).to.equal(a[i])
    }
  })
  it('should list bits', () => {
    let a = utils.listbits(24);
    expect(a).to.deep.equal([3, 4]);
    a = utils.listbits(511);
    expect(a).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8])
  })
})
