'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:NewaccountCtrl
 * @description
 * # NewaccountCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('NewaccountCtrl', function ($scope, serviceAjax, $location) {

    $scope.createAccount = function() {
      console.log($scope.account);
      return serviceAjax.createAccount($scope.account).success(function(data, status) {
        console.log(status);
        return $location.path('/accounts');
      }).error(function(status) {
        return console.log(status);
      });
    };
  });
