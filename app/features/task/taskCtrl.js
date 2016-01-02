'use strict';

var Firebase = require('firebase');

angular.module('timeboxed.task.task-controller', [require('angularfire')])

.controller('TaskCtrl', ['$scope', '$state', '$firebaseArray', function($scope, $state, $firebaseArray) {
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

        $scope.task.title = '';
        $scope.task.estimate = '';
    };

    $scope.editTask = function(id) {
        var task = $scope.tasks.$getRecord(id);
        $scope.taskToUpdate = {};
        $scope.taskToUpdate.id = task.$id;
        $scope.taskToUpdate.title = task.title;
        $scope.taskToUpdate.estimate = task.estimate;
    };

    $scope.updateTask = function() {
        var task = $scope.tasks.$getRecord($scope.taskToUpdate.id);
        task.title = $scope.taskToUpdate.title;
        task.estimate = $scope.taskToUpdate.estimate;
        $scope.tasks.$save(task).then(function() {
            $state.go('tasks');
        });
    };

    $scope.deleteTask = function(id) {
        $scope.tasks.$remove($scope.tasks.$getRecord(id));
    };

}]);
