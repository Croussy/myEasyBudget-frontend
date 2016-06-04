'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:HeadercontrollerCtrl
 * @description
 * # HeadercontrollerCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('HeadercontrollerCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
