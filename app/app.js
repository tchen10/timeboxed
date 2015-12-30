'use strict';

require('angular');
require('angular-mocks');
require('angular-ui-router');
require('angular-loader');
require('angularfire');
require('firebase');
require('./features');
require('./components');

var app = angular.module('timeboxed', [
    'ui.router',
    'timeboxed.version'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('view1', {
            url: '/view1',
            templateUrl: 'features/view1/view1.html',
            controller: require('./features/view1/view1.js').inject(app)
        })
        .state('view2', {
            url: '/view2',
            templateUrl: 'features/view2/view2.html'
        });

    $urlRouterProvider.otherwise('/view1');
}]);

app.constant('FirebaseUrl', 'https://timeboxed.firebaseio.com/');
