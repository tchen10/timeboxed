'use strict';

require('angular');
require('angular-mocks');
require('angular-ui-router');
require('angular-loader');
require('firebase');
require('angularfire');
require('./features');
require('./components');

var app = angular.module('timeboxed', [
    'ui.router',
    'timeboxed.version',
    'timeboxed.task',
    'timeboxed.view1'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'features/task/task.html',
            controller: 'TaskCtrl'
        })
        .state('tasks.addTask', {
            url: '/addTask',
            templateUrl: 'features/task/_addTask.html',
            controller: 'TaskCtrl'
        })
        .state('view1', {
            url: '/view1',
            templateUrl: 'features/view1/view1.html',
            controller: 'View1Ctrl'
        })
        .state('view2', {
            url: '/view2',
            templateUrl: 'features/view2/view2.html'
        });

    $urlRouterProvider.otherwise('/view1');
}]);

app.constant('FirebaseUrl', 'https://timeboxed.firebaseio.com/');
