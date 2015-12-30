'use strict';

angular.module('timeboxed.task.task-controller', [])

.controller('TaskCtrl', ['$scope', function($scope) {
    $scope.tasks = ['a', 'list', 'of', 'tasks'];
}]);
