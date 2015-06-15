'use strict';

describe('timeboxed.version module', function() {
  beforeEach(module('timeboxed.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
