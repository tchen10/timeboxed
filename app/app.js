'use strict';

require('angular');
require('angular-mocks');
require('angular-ui-router');
require('angular-loader');
require('angularfire');
require('firebase');
require('./features');
require('./components');

angular.module('timeboxed', [
    'ui.router',
    'timeboxed.view1',
    'timeboxed.view2',
    'timeboxed.version'
])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('view1', {
            url: '/view1',
            templateUrl: 'features/view1/view1.html',
            controller: 'View1Ctrl'
        })
        .state('view2', {
            url: '/view2',
            templateUrl: 'features/view2/view2.html',
            controller: 'View2Ctrl'
        });

    $urlRouterProvider.otherwise('/view1');
}])

.constant('FirebaseUrl', 'https://timeboxed.firebaseio.com/');
