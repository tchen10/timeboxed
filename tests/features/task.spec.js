'use strict';

describe('timeboxed.task module', function() {
    beforeEach(module('timeboxed.task.task-controller'));

    describe('task controller', function() {
        var taskCtrl, $scope;

        beforeEach(function() {
            inject(function($controller) {
                $scope = {};
                taskCtrl = $controller('TaskCtrl', {$scope: $scope});
            });
        });

        it('should create tasks array in scope', function() {
          expect(Object.prototype.toString.call($scope.tasks)).toBe('[object Array]');
        });

        it('should define addTask method', function() {
          expect(typeof $scope.addTask).toBe('function');
        });
    });
});
