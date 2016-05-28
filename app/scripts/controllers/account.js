'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('AccountCtrl', function ($scope, serviceAjax, $location, $routeParams) {

    $scope.index = function() {
      serviceAjax.getAllAccounts().success(function(data, status) {
        $scope.accounts = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.createAccount = function() {
      $scope.accountJson = {
        'nameAccount': $scope.registerForm.nameAccount.$modelValue,
        'description': $scope.registerForm.description.$modelValue,
        'amount': $scope.registerForm.amount.$modelValue,
        'nameBank': $scope.registerForm.nameBank.$modelValue
      };

      return serviceAjax.createAccount($scope.accountJson).success(function(data, status) {
        return $location.path('/accounts');
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.getAccount = function() {
      return serviceAjax.getAccount($routeParams.accountId).success(function(data, status) {
        $scope.account = data;
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.editAccount = function() {
      var id = $scope.registerForm.id.$modelValue;
      $scope.accountJson = {
        'nameAccount': $scope.registerForm.nameAccount.$modelValue,
        'description': $scope.registerForm.description.$modelValue,
        'amount': $scope.registerForm.amount.$modelValue,
        'nameBank': $scope.registerForm.nameBank.$modelValue
      };

      return serviceAjax.editAccount($scope.accountJson, id).success(function(data, status) {
        return $location.path('/account/'+ id);
      }).error(function(status) {
        return console.log(status);
      });

    };

  });
