'use strict';

describe('timeboxed.task module', function() {
    beforeEach(module('timeboxed.task'));

    describe('task controller', function() {
        var taskCtrl, scope;

        beforeEach(module('timeboxed.task.task-controller'));

        beforeEach(function() {
            inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                taskCtrl = $controller('TaskCtrl', {$scope: scope});
            });
            MockFirebase.override();
        });

        it('should create tasks array in scope', function() {
          expect(Object.prototype.toString.call(scope.tasks)).toBe('[object Array]');
        });

        it('should define addTask method', function() {
          expect(typeof scope.addTask).toBe('function');
        });

        it('should add a task to tasks array', function() {
            scope.task = {};
            scope.task.title = 'expected title';
            scope.task.estimate = 'expected estimate';
            var newTask = scope.addTask(scope.task);
            scope.$digest();

            expect(scope.tasks.length).toBe(1);
            expect(scope.tasks[0].title).toBe('expected title');
            expect(scope.tasks[0].estimate).toBe('expected estimate');
        });

        it('should clear task fields after adding task', function() {
            scope.task = {};
            scope.task.title = 'expected title';
            scope.task.estimate = 'expected estimate';
            var newTask = scope.addTask(scope.task);
            scope.$digest();

            expect(scope.task.title).toBe('');
            expect(scope.task.estimate).toBe('');
        });
    });
});
