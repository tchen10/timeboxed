'use strict';

var Firebase = require('firebase');

angular.module('timeboxed.task.task-controller', [require('angularfire')])

.controller('TaskCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var ref = new Firebase('https://timeboxed.firebaseio.com/Tasks');
    $scope.tasks = $firebaseArray(ref);

    $scope.addTask = function() {
        $scope.tasks.$add({
            title: $scope.task.title,
            estimate: $scope.task.estimate,
            timestamp: Firebase.ServerValue.TIMESTAMP
        }).then(function(ref) {
            // Add success message
        }, function(error) {
            // Add error message
        });

        $scope.task.title = "";
        $scope.task.estimate = "";
    };
}]);
