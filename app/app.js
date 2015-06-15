'use strict';

// Declare app level module which depends on views, and components
angular.module('timeboxed', [
  'ngRoute',
  'timeboxed.view1',
  'timeboxed.view2',
  'timeboxed.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
