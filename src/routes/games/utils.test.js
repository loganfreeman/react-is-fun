import * as utils from './utils';
import { expect } from 'chai';

describe('utils', () => {
    it('should get random int', () => {
      let i = utils.getRandomInt(10, 100);
      expect(i >= 10 && i < 100).to.be.true;
    })
})
