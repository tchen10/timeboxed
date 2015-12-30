'use strict';

require('angular');
require('angular-mocks');
require('angular-route');
require('angular-loader');
require('angularfire');
require('firebase');
require('./features');
require('./components');

angular.module('timeboxed', [
  'ngRoute',
  'timeboxed.view1',
  'timeboxed.view2',
  'timeboxed.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
