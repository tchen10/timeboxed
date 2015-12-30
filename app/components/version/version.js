'use strict';

require('./interpolate-filter.js');
require('./version-directive');

angular.module('timeboxed.version', [
  'timeboxed.version.interpolate-filter',
  'timeboxed.version.version-directive'
])

.value('version', '0.1');
