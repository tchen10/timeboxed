'use strict';

describe('timeboxed', function() {

  it('should automatically redirect to /tasks when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/tasks");
  });

  describe('task', function() {
    beforeEach(function() {
      browser.get('index.html#/tasks');
    });

    it('should render tasks view when user navigates to /tasks', function() {
      expect(element.all(by.css('[ui-view] h2')).first().getText()).
        toMatch(/Tasks/);
    });

    it('should add task and display in task list', function() {
      element(by.id('addTaskForm')).click();
      element(by.model('task.title')).sendKeys('example title');
      element(by.model('task.estimate')).sendKeys('example estimate');
      element(by.id('addTaskButton')).click();

      var taskList = element.all(by.repeater('task in tasks'));
      expect(taskList.count()).toEqual(1);
    });
  });

  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ui-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });

  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ui-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
