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

        describe('addTask', function() {
            it('should add a task to tasks array', function() {
                scope.task = {};
                scope.task.title = 'add title';
                scope.task.estimate = 'add estimate';
                scope.addTask(scope.task);
                scope.$digest();

                expect(scope.tasks.length).toBe(1);
                expect(scope.tasks[0].title).toBe('add title');
                expect(scope.tasks[0].estimate).toBe('add estimate');
            });

            it('should clear task fields after adding task', function() {
                scope.task = {};
                scope.task.title = 'expected title';
                scope.task.estimate = 'expected estimate';
                scope.addTask(scope.task);
                scope.$digest();

                expect(scope.task.title).toBe('');
                expect(scope.task.estimate).toBe('');
            });
        });

        describe('editTask', function() {
            var id;

            beforeEach(function() {
                scope.tasks.$add({
                    title: 'task',
                    estimate: 'estimate'
                });
                scope.$digest();

                id = scope.tasks[0].$id;
            });

            it('should get task to be edited', function() {
                scope.editTask(id);
                scope.$digest();

                expect(scope.tasks[0].title).toBe('task');
            });

            it('should update task', function() {
                scope.editTask(id);
                scope.$digest();

                scope.taskToUpdate.title = 'updated task';
                scope.taskToUpdate.estimate = 'updated estimate';

                expect(scope.tasks[0].title).toBe('updated task');
            });
        });

        afterEach(function() {
            scope.tasks.$remove(scope.tasks[0]).then(function(ref) {
                ref.key() === scope.tasks[0].$id;
            });
        });

    });
});
