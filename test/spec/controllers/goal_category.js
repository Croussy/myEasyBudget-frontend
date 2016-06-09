'use strict';

describe('Controller: GoalCategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('myEasyBudgetFrontendApp'));

  var GoalCategoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoalCategoryCtrl = $controller('GoalCategoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
