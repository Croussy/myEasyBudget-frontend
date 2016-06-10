'use strict';

describe('Controller: HighchartsbudgetCtrl', function () {

  // load the controller's module
  beforeEach(module('myEasyBudgetFrontendApp'));

  var HighchartsbudgetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HighchartsbudgetCtrl = $controller('HighchartsbudgetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
